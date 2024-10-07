import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-chat-wrapper',
  template: `
    <div class="app-container">
      <app-chat-threads></app-chat-threads>
      <div class="chat-content">
        <app-chat-window></app-chat-window>
      </div>
      <app-references></app-references>
    </div>
  `,
  styles: [`
    body {
      margin: 0;
      font-family: 'Söhne', 'Helvetica Neue', Arial, sans-serif;
      background-color: #343541;
    }
    .app-container {
      display: flex;
      height: 100vh;
      background-color: #343541;
      color: #ececf1;
    }
    app-chat-threads, app-references {
      // width: 260px;
      background-color: #202123;
    }
    app-chat-threads {
      border-right: 1px solid #4d4d4f;
    }
    .chat-content {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }
    app-chat-window {
      flex-grow: 1;
      overflow-y: auto;
    }
    .input-area {
    padding: 10px 17px;
    display: flex;
    align-items: center;
    background: #40414f;
    margin: 0px 175px;
    border-radius: 35px;
    }
    textarea {
      flex-grow: 1;
      background-color: transparent;
      border: none;
      border-radius: 5px;
      color: #ececf1;
      padding: 10px;
      font-size: 16px;
      resize: none;
      outline: none;
    }
    .send-button {
      background: none;
      border: none;
      color: #ececf1;
      cursor: pointer;
      padding: 5px;
      margin-left: 10px;
    }
    .send-button svg {
      width: 20px;
      height: 20px;
    }
    app-references {
      border-left: 1px solid #4d4d4f;
    }
  `],
  encapsulation: ViewEncapsulation.None
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