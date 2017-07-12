import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { TodoModel } from '../../shared/todo-model';
import { AddTaskModalPage  } from '../add-task-modal/add-task-modal';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl:ModalController) {
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

  addTodo(todo:TodoModel){
    this.todos.push(todo);
  }

   showAddTodo(){
    let modal = this.modalCtrl.create(AddTaskModalPage);
    modal.present();

    modal.onDidDismiss(data => {
      if(data){
        this.addTodo(data);
      }
    });
  }

}
