// chat-threads.component.ts
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

interface ChatThread {
    id: number;
    title: string;
}

@Component({
    selector: 'app-chat-threads',
    template: `
    <div class="chat-threads">
      <h2>Chat Threads</h2>
      <ul>
        <li *ngFor="let thread of chatThreads" 
            [routerLink]="['/chat', thread.id]"
            routerLinkActive="active"
            [class.active]="thread.id === activeThreadId">
          {{ thread.title }}
        </li>
      </ul>
    </div>
  `,
    styles: [`
    .chat-threads {
      padding: 10px;
    }
    ul {
      list-style-type: none;
      padding: 0;
    }
    li {
      cursor: pointer;
      padding: 5px;
      margin-bottom: 5px;
      background-color: #f0f0f0;
      border-radius: 5px;
    }
    li:hover {
      background-color: #e0e0e0;
    }
    li.active {
      background-color: #d0d0d0;
    }
  `]
})
export class ChatThreadsComponent {
    chatThreads: ChatThread[] = [
        { id: 1, title: 'General Chat' },
        { id: 2, title: 'Technical Support' },
        { id: 3, title: 'Feature Requests' },
    ];

    activeThreadId: number | null = null;

    constructor(private router: Router, private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            this.activeThreadId = +params['id'];
        });
    }
}