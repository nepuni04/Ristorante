import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { Dish } from '../../shared/dish';
import { DishProvider } from '../../providers/dish/dish';
import { Storage } from '@ionic/storage';
/*
  Generated class for the FavoriteProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class FavoriteProvider {
  private favorites = [];

  constructor(public http: Http, private dishProvider: DishProvider, private storage: Storage) {
    console.log('Hello FavoriteProvider Provider');
    this.storage.get('favorites').then(favorites => {
      if(favorites) {
        this.favorites = favorites;
        console.log("Favorites list", this.favorites);
      }
    });
  }

  isFavorite(id: number): boolean {
    return this.favorites.some(el => el === id);
  }

  getFavorites(): Observable<Dish[]> {
    return this.dishProvider.getDishes().map(dishes => 
        dishes.filter(dish => this.favorites.some(el => el === dish.id)));
  }

  removeFavorite(id: number): Observable<Dish[]> {
    let index = this.favorites.indexOf(id);
    if(index >= 0) {
      this.favorites.splice(index, 1);
      if(this.favorites.length == 0) {
        this.storage.remove('favorites');
      } else {
        this.storage.set('favorites', this.favorites);
      }
      return this.getFavorites();
    } 
    else {
      console.log('Deleting non-existant favorite', id);
      return Observable.throw('Deleting non-existant favorite' + id);
    }
  }

  toggleFavorite(id: number) {
    if(this.favorites.some(el => el === id)) {
      let index = this.favorites.indexOf(id)
      this.favorites.splice(index, 1);
      if(this.favorites.length == 0) {
        this.storage.remove('favorites');
      } else {
        this.storage.set('favorites', this.favorites);
      }
    } 
    else {
      this.favorites.push(id);
      this.storage.set('favorites', this.favorites);
    }
  }

  addFavorite(id: number): boolean {
    if (!this.isFavorite(id)) {
      this.favorites.push(id);
      this.storage.set('favorites', this.favorites);
    }  
    console.log('favorites', this.favorites);
    return true;
  }
}
