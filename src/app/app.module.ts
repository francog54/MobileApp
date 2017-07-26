import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { TodosPage } from '../pages/todos/todos';
import { ListsPage } from '../pages/lists/lists';
import { AddTaskModalPage } from '../pages/add-task-modal/add-task-modal';
import { HttpModule } from '@angular/http';
import { TodoServiceProvider } from '../shared/todo-service';
import { PrioritizedTodosPipe } from '../pipes/prioritized-todos/prioritized-todos';
import { DoneTodosPipe } from '../pipes/done-todos/done-todos';
import { ListServiceProvider } from '../shared/list-service';


@NgModule({
  declarations: [
    MyApp,
    TodosPage,
    ListsPage,
    AddTaskModalPage,
    PrioritizedTodosPipe,
    DoneTodosPipe,
   
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TodosPage,
    ListsPage,
    AddTaskModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TodoServiceProvider,
    ListServiceProvider
  ]
})
export class AppModule {}
