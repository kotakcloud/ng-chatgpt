// app.component.ts
import { Component } from '@angular/core';
// import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
// import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  /* constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      let route = this.activatedRoute.firstChild;
      if (route) {
        const threadId = route.snapshot.params['id'];
        // You can emit this threadId to a shared service if needed
      }
    });
  } */
}