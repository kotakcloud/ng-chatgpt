import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { ChatWindowComponent } from './chat-window.component';

const routes: Routes = [
  // { path: '', redirectTo: '/chat/1', pathMatch: 'full' },
  // { path: 'chat/:id', component: ChatWindowComponent},
  { path: 'chat', loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
