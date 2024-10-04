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
      <h2>References</h2>
      <button (click)="toggleReferences()">{{ isExpanded ? 'Hide' : 'Show' }} References</button>
      <ul *ngIf="isExpanded">
        <li *ngFor="let ref of currentReferences">
          <a [href]="ref.url" target="_blank">{{ ref.title }}</a>
        </li>
      </ul>
    </div>
  `,
    styles: [`
    .references {
      padding: 10px;
    }
    ul {
      list-style-type: none;
      padding: 0;
    }
    li {
      margin-bottom: 5px;
    }
    button {
      margin-bottom: 10px;
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