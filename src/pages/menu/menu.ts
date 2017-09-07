import { Component, OnInit, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { DishProvider } from '../../providers/dish/dish';
import { DishdetailPage } from '../dishdetail/dishdetail';
import { FavoriteProvider } from '../../providers/favorite/favorite';
/**
 * Generated class for the MenuPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  dishes: Dish[];
  dishErrMess: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private dishProvider: DishProvider,
    private favoriteProvider: FavoriteProvider,
    @Inject('BaseURL') private BaseURL
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  ngOnInit() {
    this.dishProvider.getDishes().subscribe(dishes => this.dishes = dishes,
      errmsg => this.dishErrMess = <any> errmsg);
  }

  dishSelected(dish: Dish) {
    this.navCtrl.push(DishdetailPage, {
      dish: dish
    })
  }

  addToFavorite(dish: Dish) {
    this.favoriteProvider.addFavorite(dish.id);
  }
}
