import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-chat-wrapper',
  template: `<div class="app-container">
      <app-chat-threads></app-chat-threads>
      <app-chat-window></app-chat-window>
      <app-references></app-references>
    </div>`,
  styles: [`
    .app-container {
      display: flex;
      height: 100vh;
    }
    app-chat-threads, app-references {
      width: 15%;
      min-width: 150px;
    }
    app-chat-threads {
      border-right: 1px solid #ccc;
    }
    app-chat-window {
      flex-grow: 1;
      width: 70%;
    }
    app-references {
      border-left: 1px solid #ccc;
    }
  `]
})
export class ChatWrapperComponent {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      let route = this.activatedRoute.firstChild;
      if (route) {
        const threadId = route.snapshot.params['id'];
        // You can emit this threadId to a shared service if needed
      }
    });
  }
}