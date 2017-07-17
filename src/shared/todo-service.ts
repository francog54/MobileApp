import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { TodoModel} from './todo-model';

/*
  Generated class for the TodoServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class TodoServiceProvider {

  private todos: TodoModel[];


  constructor(public http: Http) {
    this.getTodos();
  }

  getTodos(){
        this.todos = [
      new TodoModel("this is an element"),
      new TodoModel("this is an element"),
      new TodoModel("this is an element"),
      new TodoModel("this is an element"),
      new TodoModel("this is an element"),
      new TodoModel("this is an element",true),
      new TodoModel("this is an element"),
      new TodoModel("this is an element",false,true),
      new TodoModel("this is an element"),
      new TodoModel("this is an element"),      
    ]
  }

    toggleTodo(todo:TodoModel){
    todo.isDone = ! todo.isDone
  }

  addTodo(todo:TodoModel){
    this.todos.push(todo);
  }

}
