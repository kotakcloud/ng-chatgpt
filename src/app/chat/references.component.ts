// references.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Reference {
    id: number;
    title: string;
    url: string;
}

@Component({
    selector: 'app-references',
    template: `
    <div class="references">
      <div class="references-header">
        <h2>References</h2>
      <button (click)="toggleReferences()" class="toggle-button"> <svg class="toggle-icon" [class.expanded]="isExpanded" viewBox="0 0 24 24" width="24" height="24">
          <path d="M7 10l5 5 5-5z"/>
        </svg>
      </button>
      </div>
      <ul *ngIf="isExpanded" class="reference-list">
        <li *ngFor="let ref of currentReferences">
          <a [href]="ref.url" class="reference-link" target="_blank">{{ ref.title }}</a>
        </li>
      </ul>
      <!-- <div class="reference-list">
        <a href="https://angular.io/docs" target="_blank" class="reference-link">Angular Documentation</a>
        <a href="https://rxjs.dev/" target="_blank" class="reference-link">RxJS Documentation</a>
      </div> -->
    </div>
  `,
    styles: [`
    .references {
      width: 260px;
      background-color: #202123;
      padding: 20px;
      border-left: 1px solid #4d4d4f;
    }
    .references-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    h2 {
      font-size: 18px;
      margin-bottom: 20px;
    }
    .hide-button {
      padding: 5px 10px;
      background-color: #565869;
      border: none;
      border-radius: 5px;
      color: #ececf1;
      cursor: pointer;
      margin-bottom: 20px;
    }
    .reference-list {
      display: flex;
      flex-direction: column;
      list-style: none;
      padding: 0;
      line-height: 2;
    }
    .reference-link {
      color: #8e8ea0;
      text-decoration: none;
      margin-bottom: 10px;
    }
    .reference-link:hover {
      text-decoration: underline;
    }
    .toggle-button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      color: #8e8ea0;
      display: flex;
      align-items: center;
      
    }
    .toggle-button:hover {
      color: #ececf1;
    }
    .toggle-icon {
      fill: currentColor;
      transition: transform 0.3s ease;
    }
    .toggle-icon.expanded {
      transform: rotate(180deg);
    }
  `]
})
export class ReferencesComponent implements OnInit {
  isExpanded = true;
  activeThreadId: number | null = null;

  allReferences: { [key: number]: Reference[] } = {
    1: [
      { id: 1, title: 'Angular Documentation', url: 'https://angular.io/docs' },
      { id: 2, title: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/' },
    ],
    2: [
      { id: 3, title: 'JavaScript MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
      { id: 4, title: 'Web APIs', url: 'https://developer.mozilla.org/en-US/docs/Web/API' },
    ],
    3: [
      { id: 5, title: 'React Documentation', url: 'https://reactjs.org/docs/getting-started.html' },
      { id: 6, title: 'Vue.js Guide', url: 'https://vuejs.org/v2/guide/' },
    ],
  };

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.activeThreadId = +params['id'];
    });
  }

  get currentReferences(): Reference[] {
    return this.allReferences[this.activeThreadId || 1] || [];
  }

  toggleReferences() {
    this.isExpanded = !this.isExpanded;
  }
}