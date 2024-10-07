import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatWrapperComponent } from './chat-wrapper.component';

const routes: Routes = [
  { path: '', redirectTo: '1', pathMatch: 'full' },
  { path: ':id', component: ChatWrapperComponent}
];

@NgModule({
  imports: [RouterModule.forChild (routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
