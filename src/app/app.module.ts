import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { UserSelectionComponent } from './user-selection/user-selection.component';
import { ThreadSectionComponent } from './thread-section/thread-section.component';
import { MessageSectionComponent } from './message-section/message-section.component';
import { MessageListComponent } from './message-list/message-list.component';
import { ThreadListComponent } from './thread-list/thread-list.component';
import {ThreadsService} from "./services/threads.service";
import {StoreModule, Action} from "@ngrx/store";
import {INITIAL_APPLICATION_STATE, ApplicationState} from "./store/application-state";
import {LOAD_USER_THREADS_ACTION, LoadUserThreadsAction} from "./store/actions";
import * as _ from 'lodash';

function storeReducer(state: ApplicationState = INITIAL_APPLICATION_STATE, action: Action) :ApplicationState{
  console.log(action.type);
  switch (action.type){
    case LOAD_USER_THREADS_ACTION:
      return handleLoadUserThreadsAction(state, action);
    default:
      return state;
  }
}

function handleLoadUserThreadsAction(state:ApplicationState, action: LoadUserThreadsAction):ApplicationState{
  const newState: ApplicationState = Object.assign({}, state);
  newState.storeData = {
    participants: _.keyBy(action.payload.participants, 'id'),
    messages: _.keyBy(action.payload.messages, 'id'),
    threads: _.keyBy(action.payload.threads, 'id')
  }
  console.log(newState);
  return newState;
}


@NgModule({
  declarations: [
    AppComponent,
    UserSelectionComponent,
    ThreadSectionComponent,
    MessageSectionComponent,
    MessageListComponent,
    ThreadListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    StoreModule.provideStore({storeReducer}, INITIAL_APPLICATION_STATE)
  ],
  providers: [ThreadsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
