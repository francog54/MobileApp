import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TodoModel } from '../../shared/todo-model';

/**
 * Generated class for the TodosPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-todos',
  templateUrl: 'todos.html',
})
export class TodosPage {

  private todos: TodoModel[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
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

setTodoStyles(item:TodoModel){

  let styles = {
    'text-decoration': item.isDone ? 'line-through' : 'none',
    'font-weight': item.isImportant ? '600' : 'normal'
  };

  return styles;


}

  toggleTodo(todo:TodoModel){
    todo.isDone = ! todo.isDone
  }

   showAddTodo(){
    console.log("Hiii!!");
  }

}
