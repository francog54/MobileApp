import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { TodoModel} from './todo-model';
import { AppSettings } from './app-settings';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

/*
  Generated class for the TodoServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class TodoServiceProvider {

  private todos: TodoModel[] = [];


  constructor(public http: Http, public local:Storage) {
  }

  public loadFromList(id:number){
    this.getFromLocal(id).then(()=>{
      this.loadFromServer(id);
    })
  }

  private getFromLocal(id:number){
    return this.local.ready().then(()=>{
      return this.local.get(`list/${id}`).then(
        data => {
          if(!data){
            this.todos = [];
            return;
          }
          let localTodos:TodoModel[] = [];
          for (let todo of data){
            localTodos.push(TodoModel.clone(todo));
          }
          this.todos = localTodos;
        }
      )
    }

    )
  }

  private loadFromServer(id:number){
    this.http.get(`${AppSettings.API_ENDPOINT}/lists/${id}/todos`)
    .map(response => {
      return response.json()
    })
    .map((todos:Object[])=>{
      return todos.map(item => TodoModel.fromJson(item));
    })
    .subscribe(
      (result:TodoModel[]) => {
        this.todos = result;
        this.saveLocally(id);
      },
      error => {
        console.log("Error loading lists from server",error);
      }
    )
  }

  private postNewTodoToServer(todo:TodoModel): Observable<TodoModel>{
    let Observable = this.http.post(`${AppSettings.API_ENDPOINT}/lists/${todo.listId}/todos`,
  {
    description: todo.description,
    isImportant: todo.isImportant,
    isDone: todo.isDone
  })
    .map(response => response.json())
    .map(todo => TodoModel.fromJson(todo))
    .share();

    return Observable;
  }

  public saveLocally(id:number){
    this.local.ready().then(()=>{
      this.local.set(`list/${id}`,this.todos)
    }

    )

    }
  

    toggleTodo(todo:TodoModel){
    setTimeout(()=>{
        
        const todoIndex = this.todos.indexOf(todo);
        let updatedTodo = TodoModel.clone(todo);
        updatedTodo.isDone = !todo.isDone;

        this.todos = [
          ...this.todos.slice(0,todoIndex),
          updatedTodo,
          ...this.todos.slice(todoIndex+1)
        ];
    }
    )
  }

  addTodo(todo:TodoModel){
    let observable = this.postNewTodoToServer(todo);
    observable.subscribe(
      (todo:TodoModel) => {
        this.todos = [...this.todos,todo];
        this.saveLocally(todo.listId);
      },
      error => console.log("Error trying to post a new list")
    );

    return observable;

    
  }

  removeTodo(todo:TodoModel){
    const index = this.todos.indexOf(todo);
    this.todos = [
      ...this.todos.slice(0,index),
      ...this.todos.slice(index+1)
    ]
  }

  updateTodo(originalTodo:TodoModel,modifiedTodo:TodoModel){
    const index = this.todos.indexOf(originalTodo);
    this.todos = [
      ...this.todos.slice(0,index),
      modifiedTodo,
      ...this.todos.slice(index+1)
    ]
  }

}
