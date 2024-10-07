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
            <div class="message-container">
              <div class="message-content">{{ message.content }}</div>
              <div class="message-actions">
                <ng-container *ngIf="message.sender === 'User'">
                  <button *ngIf="isLastUserMessage(message)" (click)="startEditing(message)" class="icon-button edit-button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18px" height="18px">
                      <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                    </svg>
                  </button>
                  <button (click)="deleteMessage(message, i)" class="icon-button delete-button" >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18px" height="18px">
                      <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </ng-container>
              </div>
            </div>
          </ng-container>
          <ng-template #editingMessage>
            <div class="message-container">
              <div class="message-content">
              <input [(ngModel)]="message.content" (keyup.enter)="finishEditing(message)" (blur)="finishEditing(message)">
              </div>
              <div class="message-actions">
              <button (click)="finishEditing(message)" class="icon-button save-button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18px" height="18px">
                    <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clip-rule="evenodd" />
                  </svg>
              </button>
              </div>
            </div>
          </ng-template>
        </div>
      </div>
      <!-- <div class="message-input">
        <input [(ngModel)]="newMessage" (keyup.enter)="sendMessage()" placeholder="Type a message...">
        <button (click)="sendMessage()">Send</button>
      </div> -->
      <div class="input-area">
          <textarea [(ngModel)]="newMessage" (keyup.enter)="sendMessage()" placeholder="Message ChatGPT" rows="1"></textarea>
          <button class="send-button" (click)="sendMessage()">
            <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg> -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M11.47 2.47a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 4.06 5.03 11.03a.75.75 0 01-1.06-1.06l7.5-7.5z" />
              <path d="M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z" />
            </svg>
          </button>
        </div>
        <p class="disclaimer">ChatGPT can make mistakes. Check important info.</p>
    </div>
  `,
    styles: [`
    .chat-window {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding-left: 10px;
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
    .message-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      border-bottom: 1px solid #4d4d4f;
    }
    .message-content {
      flex-grow: 1;
    }
    .message-actions {
      display: flex;
      gap: 10px;
    }
    .icon-button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 5px;
      border-radius: 50%;
      transition: background-color 0.3s;
      color: #bbb;
    }
    .icon-button:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
    .edit-button {
      // color: #4CAF50;
    }
    .delete-button {
      // color: #F44336;
    }
    .disclaimer {
      margin: 5px auto;
      opacity: 0.5;
    }
     .send-button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 32px;
      height: 32px;
      margin-left: 10px;
      background-color: #565869;
      border: none;
      border-radius: 50%;
      color: #ececf1;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .send-button:hover {
      background-color: #6e7081;
    }

    .send-button svg {
      width: 18px;
      height: 18px;
    }
    .message-content input {
      background: transparent;
      width: 100%;
    outline: none;
    border: none;
    border-bottom: 1px;
    color: white;
    /* opacity: 0.8; */
    text-decoration: none;
    font-size: inherit;
    font-style: italic;
}
   .save-button {
      color: #4CAF50; // Optional: gives the save button a green color
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