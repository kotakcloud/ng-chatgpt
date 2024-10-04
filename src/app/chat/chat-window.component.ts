// chat-window.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface ChatMessage {
    id: number;
    threadId: number;
    sender: string;
    content: string;
    timestamp: Date;
    isEditing?: boolean;
}

@Component({
    selector: 'app-chat-window',
    template: `
    <div class="chat-window" *ngIf="activeThreadId">
      <h2>Chat Thread {{ activeThreadId }}</h2>
      <div class="message-list">
        <div *ngFor="let message of filteredMessages; let i = index" class="message">
          <strong>{{ message.sender }}</strong>:
          <ng-container *ngIf="!message.isEditing; else editingMessage">
            {{ message.content }}
            <ng-container *ngIf="message.sender === 'User'">
              <button *ngIf="isLastUserMessage(message)" (click)="startEditing(message)">Edit</button>
              <button (click)="deleteMessage(message, i)">Delete</button>
            </ng-container>
          </ng-container>
          <ng-template #editingMessage>
            <input [(ngModel)]="message.content" (keyup.enter)="finishEditing(message)" (blur)="finishEditing(message)">
            <button (click)="finishEditing(message)">Save</button>
          </ng-template>
        </div>
      </div>
      <div class="message-input">
        <input [(ngModel)]="newMessage" (keyup.enter)="sendMessage()" placeholder="Type a message...">
        <button (click)="sendMessage()">Send</button>
      </div>
    </div>
  `,
    styles: [`
    .chat-window {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .message-list {
      flex-grow: 1;
      overflow-y: auto;
      padding: 10px;
    }
    .message {
      margin-bottom: 10px;
    }
    .message-input {
      display: flex;
      padding: 10px;
    }
    input {
      flex-grow: 1;
      margin-right: 10px;
    }
    button {
      margin-left: 5px;
    }
  `]
})
export class ChatWindowComponent implements OnInit {
    messages: ChatMessage[] = [
        { id: 1, threadId: 1, sender: 'User', content: 'Hello!', timestamp: new Date(2023, 4, 1, 10, 0) },
        { id: 2, threadId: 1, sender: 'AI', content: 'Hi there! How can I help you today?', timestamp: new Date(2023, 4, 1, 10, 1) },
        { id: 3, threadId: 1, sender: 'User', content: 'I have a question about Angular.', timestamp: new Date(2023, 4, 1, 10, 2) },
        { id: 4, threadId: 1, sender: 'AI', content: 'Sure, I\'d be happy to help with your Angular question. What would you like to know?', timestamp: new Date(2023, 4, 1, 10, 3) },
        { id: 5, threadId: 2, sender: 'User', content: 'I have a technical question.', timestamp: new Date(2023, 4, 1, 11, 0) },
        { id: 6, threadId: 2, sender: 'AI', content: 'Sure, I\'d be happy to help with your technical question.', timestamp: new Date(2023, 4, 1, 11, 1) },
        { id: 7, threadId: 3, sender: 'User', content: 'I have a feature request.', timestamp: new Date(2023, 4, 1, 12, 0) },
        { id: 8, threadId: 3, sender: 'AI', content: 'Great! I\'d love to hear about your feature request.', timestamp: new Date(2023, 4, 1, 12, 1) },
    ];

    newMessage = '';
    activeThreadId: number | null = null;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.activeThreadId = +params['id'];
            console.log(this.activeThreadId);
        });
    }

    get filteredMessages() {
        return this.messages.filter(message => message.threadId === this.activeThreadId);
    }

    sendMessage() {
        if (this.newMessage.trim() && this.activeThreadId) {
            this.messages.push({
                id: this.messages.length + 1,
                threadId: this.activeThreadId,
                sender: 'User',
                content: this.newMessage,
                timestamp: new Date()
            });
            this.newMessage = '';
        }
    }

    startEditing(message: ChatMessage) {
        message.isEditing = true;
    }

    finishEditing(message: ChatMessage) {
        message.isEditing = false;
    }

    deleteMessage(message: ChatMessage, index: number) {
        const threadMessages = this.filteredMessages;
        const deleteIndex = threadMessages.indexOf(message);
        if (deleteIndex !== -1) {
            // Find the index in the main messages array
            const mainIndex = this.messages.findIndex(m => m.id === message.id);
            // Delete this message and all subsequent messages in the thread
            this.messages = this.messages.filter(m =>
                m.threadId !== this.activeThreadId ||
                (m.threadId === this.activeThreadId && this.messages.indexOf(m) < mainIndex)
            );
        }
    }

    isLastUserMessage(message: ChatMessage): boolean {
        const userMessages = this.filteredMessages.filter(m => m.sender === 'User');
        return message === userMessages[userMessages.length - 1];
    }
}