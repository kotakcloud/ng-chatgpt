// chat-threads.component.ts
import { Component, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-chat-threads',
    template: `
    <div class="chat-threads">
      <div class="chat-title-container">
        <h2 class="chat-title">Chat Threads</h2>
      <button aria-label="New chat" class="new-thread-btn" (click)="addNew()"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="icon-xl-heavy"><path d="M15.6729 3.91287C16.8918 2.69392 18.8682 2.69392 20.0871 3.91287C21.3061 5.13182 21.3061 7.10813 20.0871 8.32708L14.1499 14.2643C13.3849 15.0293 12.3925 15.5255 11.3215 15.6785L9.14142 15.9899C8.82983 16.0344 8.51546 15.9297 8.29289 15.7071C8.07033 15.4845 7.96554 15.1701 8.01005 14.8586L8.32149 12.6785C8.47449 11.6075 8.97072 10.615 9.7357 9.85006L15.6729 3.91287ZM18.6729 5.32708C18.235 4.88918 17.525 4.88918 17.0871 5.32708L11.1499 11.2643C10.6909 11.7233 10.3932 12.3187 10.3014 12.9613L10.1785 13.8215L11.0386 13.6986C11.6812 13.6068 12.2767 13.3091 12.7357 12.8501L18.6729 6.91287C19.1108 6.47497 19.1108 5.76499 18.6729 5.32708ZM11 3.99929C11.0004 4.55157 10.5531 4.99963 10.0008 5.00007C9.00227 5.00084 8.29769 5.00827 7.74651 5.06064C7.20685 5.11191 6.88488 5.20117 6.63803 5.32695C6.07354 5.61457 5.6146 6.07351 5.32698 6.63799C5.19279 6.90135 5.10062 7.24904 5.05118 7.8542C5.00078 8.47105 5 9.26336 5 10.4V13.6C5 14.7366 5.00078 15.5289 5.05118 16.1457C5.10062 16.7509 5.19279 17.0986 5.32698 17.3619C5.6146 17.9264 6.07354 18.3854 6.63803 18.673C6.90138 18.8072 7.24907 18.8993 7.85424 18.9488C8.47108 18.9992 9.26339 19 10.4 19H13.6C14.7366 19 15.5289 18.9992 16.1458 18.9488C16.7509 18.8993 17.0986 18.8072 17.362 18.673C17.9265 18.3854 18.3854 17.9264 18.673 17.3619C18.7988 17.1151 18.8881 16.7931 18.9393 16.2535C18.9917 15.7023 18.9991 14.9977 18.9999 13.9992C19.0003 13.4469 19.4484 12.9995 20.0007 13C20.553 13.0004 21.0003 13.4485 20.9999 14.0007C20.9991 14.9789 20.9932 15.7808 20.9304 16.4426C20.8664 17.116 20.7385 17.7136 20.455 18.2699C19.9757 19.2107 19.2108 19.9756 18.27 20.455C17.6777 20.7568 17.0375 20.8826 16.3086 20.9421C15.6008 21 14.7266 21 13.6428 21H10.3572C9.27339 21 8.39925 21 7.69138 20.9421C6.96253 20.8826 6.32234 20.7568 5.73005 20.455C4.78924 19.9756 4.02433 19.2107 3.54497 18.2699C3.24318 17.6776 3.11737 17.0374 3.05782 16.3086C2.99998 15.6007 2.99999 14.7266 3 13.6428V10.3572C2.99999 9.27337 2.99998 8.39922 3.05782 7.69134C3.11737 6.96249 3.24318 6.3223 3.54497 5.73001C4.02433 4.7892 4.78924 4.0243 5.73005 3.54493C6.28633 3.26149 6.88399 3.13358 7.55735 3.06961C8.21919 3.00673 9.02103 3.00083 9.99922 3.00007C10.5515 2.99964 10.9996 3.447 11 3.99929Z" ></path></svg></button>
      </div>
      <div class="thread-list">
        <div class="thread" *ngFor="let thread of threads; let i = index"
        [routerLink]="['/chat', thread.id]"
            routerLinkActive="active"
            [class.active]="thread.id === activeThreadId" (contextmenu)="onRightClick($event, i)">
          <!-- {{ thread.title }} -->
          <ng-container *ngIf="editingIndex !== i; else editMode">
            {{ thread.title }}
          </ng-container>
          <ng-template #editMode>
            <input #editInput
                   [value]="thread.title"
                   (blur)="onEditComplete(i, editInput.value)"
                   (keyup.enter)="onEditComplete(i, editInput.value)"
                   (keyup.escape)="cancelEdit()"
                   class="edit-input">
          </ng-template>
        </div>
      </div>
    </div>
    <div class="context-menu" *ngIf="showContextMenu" [style.left.px]="contextMenuX" [style.top.px]="contextMenuY">
      <div class="context-menu-item" (click)="onRename()">Rename</div>
      <div class="context-menu-item" (click)="onDelete()">Delete</div>
    </div>
  `,
    styles: [`
    .chat-title-container {
      display: flex;
      .chat-title {
        flex: 1;
      }
    }
    .chat-threads {
      width: 260px;
      background-color: #202123;
      padding: 20px;
      border-right: 1px solid #4d4d4f;
    }
    .new-thread-btn {
      background-color: transparent;
      background-image: none;
      color: #b4b4b4;
      text-transform: none;
      outline: none;
      border: 0px;
      cursor: pointer;
    }
    h2 {
      font-size: 18px;
      margin-bottom: 20px;
    }
    .thread-list {
      display: flex;
      flex-direction: column;
    }
    .thread {
      padding: 10px;
      margin-bottom: 10px;
      border-radius: 5px;
      &:hover,
      &.active {
        background-color: #343541;
      }
    }
    .context-menu {
      position: fixed;
      background-color: #40414f;
      border: 1px solid #565869;
      border-radius: 5px;
      padding: 5px 0;
      z-index: 1000;
    }
    .context-menu-item {
      padding: 8px 12px;
      cursor: pointer;
    }
    .context-menu-item:hover {
      background-color: #565869;
    }
     .edit-input {
      width: 100%;
      background-color: #40414f;
      color: #ececf1;
      border: 1px solid #565869;
      border-radius: 3px;
      padding: 5px;
      font-size: 14px;
    }
  `]
})
export class ChatThreadsComponent {
  threads: any[] = [
    { id: 1, title: 'General Chat' },
    { id: 2, title: 'Technical Support' },
    { id: 3, title: 'Feature Requests' },
  ];

  activeThreadId: number | null = null;
  showContextMenu = false;
  contextMenuX = 0;
  contextMenuY = 0;
  selectedThreadIndex: number | null = null;
  editingIndex: number | null = null;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.activeThreadId = +params['id'];
    });
  }

  addNew() {
    this.threads.push({ id: this.threads.length + 1, title: 'New Chat' });
    // this.chatDataService.addNew();
    // navigate to the new chat
    this.router.navigate(['/chat', this.threads.length]);
  }

  onRightClick(event: MouseEvent, index: number) {
    event.preventDefault();
    this.showContextMenu = true;
    this.contextMenuX = event.clientX;
    this.contextMenuY = event.clientY;
    this.selectedThreadIndex = index;
  }

  @HostListener('document:click')
  onDocumentClick() {
    this.showContextMenu = false;
  }

  onRename() {
    if (this.selectedThreadIndex !== null) {
      this.editingIndex = this.selectedThreadIndex;
      this.showContextMenu = false;
      setTimeout(() => {
        const input = document.querySelector('.edit-input') as HTMLInputElement;
        if (input) input.focus();
      });
    }
  }

  onDelete() {
    if (this.selectedThreadIndex !== null) {
      this.threads.splice(this.selectedThreadIndex, 1);
    }
    this.showContextMenu = false;
  }

  onEditComplete(index: number, newName: string) {
    if (newName.trim()) {
      this.threads[index].title = newName.trim();
    }
    this.editingIndex = null;
  }

  cancelEdit() {
    this.editingIndex = null;
  }
}