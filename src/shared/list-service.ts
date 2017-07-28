import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { ListModel } from './list-model';
import { AppSettings } from './app-settings';

/*
  Generated class for the ListServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ListServiceProvider {

  public lists:ListModel[] = [];

  constructor(public http: Http,public local:Storage) {
    this.getLists();
  }

  private getLists(){
    this.getFromLocal().then(
      ()=>{
        this.getFromServer()
      },
       ()=>{
        this.getFromServer()
      }
    )
  }

  public addList(name:string){
    let list = new ListModel(name,this.lists.length);
    this.lists = [...this.lists, list];
    return list;
  }

  public getFromLocal() {
      return this.local.ready().then(()=>{
          return this.local.get('lists').then(
            data => {
              let localLists:ListModel[] = [];
              if(data){
                for(let list of data){
                  localLists.push(new ListModel(list.name, list.id));
                }
              }
              this.lists = localLists;
            })
      })
  }

  private getFromServer(){
    this.http.get(`${AppSettings.API_ENDPOINT}/lists`)
        .map(response => {return response.json()})
        .map((lists:Object[]) => {
          return lists.map(item => ListModel.fromJson(item));
        })
        .subscribe(
          (result:ListModel[]) => {
            this.lists = result;
            this.saveLocallly();
          },
          error => {
            console.log("Error loading lists from server",error);
          }

        )
  }

  public saveLocallly(){
    this.local.ready().then (()=>{
      this.local.set('lists',this.lists);
    }

    )
  }

}
