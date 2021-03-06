import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,Platform, LoadingController } from 'ionic-angular';
import { TodoModel } from '../../shared/todo-model';
import { ListModel } from '../../shared/list-model';
import { TodoServiceProvider } from '../../shared/todo-service';
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

  private toogleTodoTimeout = null;
  private list:ListModel;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl:ModalController,
    public TodoServiceProvider:TodoServiceProvider,
    private Platform:Platform,
    private loadingCtrl:LoadingController
  ) {
    this.list = this.navParams.get('list');
    this.TodoServiceProvider.loadFromList(this.list.id);
  }

  ionViewDidLoad() {

  }

  ionViewWillUnload(){
    this.TodoServiceProvider.saveLocally(this.list.id);
  }

setTodoStyles(item:TodoModel){

  let styles = {
    'text-decoration': item.isDone ? 'line-through' : 'none',
    'font-weight': item.isImportant ? '600' : 'normal'
  };

  return styles;


}

toggleTodo(todo:TodoModel){
  if(this.toogleTodoTimeout)
    return;
  setTimeout(()=>{
     this.TodoServiceProvider.toggleTodo(todo);
     this.toogleTodoTimeout = null;
  } ,this.Platform.is('ios') ? 0 : 300);
    
    
}

removeTodo(todo:TodoModel){
  this.TodoServiceProvider.removeTodo(todo);
}

addTodo(todo:TodoModel){
  let loader = this.loadingCtrl.create();
  loader.present();
  this.TodoServiceProvider.addTodo(todo)
  .subscribe(()=> loader.dismiss(),()=>loader.dismiss());
}

updateTodo(originalTodo:TodoModel, modifiedTodo:TodoModel){
  let loader = this.loadingCtrl.create();
  loader.present();

  this.TodoServiceProvider.updateTodo(originalTodo,modifiedTodo)
  .subscribe(()=>loader.dismiss(),()=>loader.dismiss());
}

showAddTodo(){
    let modal = this.modalCtrl.create(AddTaskModalPage,{listId: this.list.id});
    modal.present();

    modal.onDidDismiss(data => {
      if(data){
        this.addTodo(data);
      }
    });
}



showEditTodo(todo:TodoModel){
  let modal = this.modalCtrl.create(AddTaskModalPage,{todo});
  modal.present();

  modal.onDidDismiss(data=>{
    if(data){
      this.updateTodo(todo,data);
    }
  });

}

}
