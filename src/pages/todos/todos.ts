import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  public todos: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.todos = [
      {
        description : "Esto es una tarea",
        isDone : false
      },
      {
        description : "Esto es una 2 tarea",
        isDone : false
      },
      {
        description : "Esto es una 3 tarea",
        isDone : false
      },
      {
        description : "Esto es una 4 tarea",
        isDone : false
      },
      {
        description : "Esto es una 5 tarea",
        isDone : false
      },
      {
        description : "Esto es una 6 tarea",
        isDone : false
      },
            
    ]
  }

}
