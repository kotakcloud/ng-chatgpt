import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatWrapperComponent } from './chat-wrapper.component';
import { FormsModule } from '@angular/forms';
import { ChatThreadsComponent } from './chat-threads.component';
import { ChatWindowComponent } from './chat-window.component';
import { ReferencesComponent } from './references.component';
import { ChatRoutingModule } from './chat-routing.module';



@NgModule({
  declarations: [
    ChatWrapperComponent,
    ChatThreadsComponent,
    ChatWindowComponent,
    ReferencesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChatRoutingModule
  ]
})
export class ChatModule { }
