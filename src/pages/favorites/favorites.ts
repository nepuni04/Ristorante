import { Component, OnInit, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding } from 'ionic-angular';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { Observable } from 'rxjs/Observable';
import { Dish } from '../../shared/dish';
/**
 * Generated class for the FavoritesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage implements OnInit {
  private favorites: Dish[];
  private errMess: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private favoriteProvider: FavoriteProvider,
    @Inject('BaseURL') private BaseURL
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }

  ngOnInit() {
    this.favoriteProvider.getFavorites().subscribe(dishes => this.favorites = dishes, 
      errmsg => this.errMess = errmsg);
  }

  removeFavorite(item: ItemSliding, id: number) {
    console.log('Delete', id);
    this.favoriteProvider.removeFavorite(id).subscribe(dishes => this.favorites = dishes,
      errmsg => this.errMess =errmsg);
    item.close();  
  }
}
