import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AddTaskModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-task-modal',
  templateUrl: 'add-task-modal.html',
})
export class AddTaskModalPage {

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTaskModalPage');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}
