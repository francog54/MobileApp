import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { TodosPage } from '../todos/todos';
import { ListServiceProvider } from '../../shared/list-service';
import { ListModel } from '../../shared/list-model';

/**
 * Generated class for the ListsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-lists',
  templateUrl: 'lists.html',
})
export class ListsPage {
  public selectedList:ListModel = null;

  constructor(public navCtrl: NavController, public navParams: NavParams,public AlertController: AlertController,
  public ListServiceProvider:ListServiceProvider, private loadingCtrl:LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListsPage');
  }

  goToList(list:ListModel){
    this.clearSelectedList();
    this.navCtrl.push(TodosPage, {list});
  }

  addNewList(name:string){
    let loader = this.loadingCtrl.create();
    loader.present();

    this.ListServiceProvider.addList(name)
    .subscribe(list => {
      this.goToList(list);
      loader.dismiss();
    },error => {loader.dismiss();});
    
  }

  showAddList(){
    let addListAlert = this.AlertController.create({
      title: 'Nueva Lista',
      message: 'Ponle un nombre a tu nueva lista',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        }
      ],
      buttons:[
        {
          text: 'Cancelar',
          handler: data=>{}
        },
        {
          text: 'Agregar',
          handler: data=>{
             let navTransition = addListAlert.dismiss();
             navTransition.then(()=>{
                this.addNewList(data.name); });
          }
        }
      ]

    });

    addListAlert.present();

  }

  clearSelectedList(){
    this.selectedList = null;
  }

  selectList(list:ListModel){
    if(this.selectedList == list){
      this.clearSelectedList();
    }
    else{
      this.selectedList = list;
    }
  }

  removeSelectedList(){
    this.ListServiceProvider.removeList(this.selectedList);
    this.selectedList = null;
  }

}
