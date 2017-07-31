import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import  'rxjs/add/operator/share';
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
    let Observable = this.postNewListToServer(name);

    Observable.subscribe(
      (list:ListModel)=>{
        this.lists = [...this.lists, list];
        this.saveLocallly();
      },
      error => console.log ("Error trying to post a new list to the server")
    );

    return Observable;
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

  private postNewListToServer(name): Observable<ListModel>{
    let Observable = this.http.post(`${AppSettings.API_ENDPOINT}/lists`,{name})
                    .share()
                    .map(response => response.json())
                    .map(list => ListModel.fromJson(list));

    Observable.subscribe(()=>{},()=>{});               

    return Observable;
  }

  private deleteListFromServer(id:number){
    let observable = this.http.delete(`${AppSettings.API_ENDPOINT}/lists/${id}`)
                    .map(response => response.json()).share();
                    return observable;
  }

  public saveLocallly(){
    this.local.ready().then (()=>{
      this.local.set('lists', JSON.stringify(this.lists));
    }

    )
  }

  public removeList(list: ListModel){
    this.deleteListFromServer(list.id).subscribe(
      () =>{
        let index = this.lists.indexOf(list);
        this.lists = [...this.lists.slice(0,index),...this.lists.slice(index+1)];
        this.saveLocallly();
      },
      (error) => {console.log(`an error ocurred while trying to remove list: ${list.name}`)}
    )
  }

}
