import { Component, OnInit, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { DishProvider } from '../../providers/dish/dish';
import { FavoriteProvider } from '../../providers/favorite/favorite';
/*import { DishdetailPage } from '../dishdetail/dishdetail';*/

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
    @Inject('BaseURL') private BaseURL,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  ngOnInit() {
    let loading = this.loadingCtrl.create({
      content: "Loading . . . Please wait"
    });
    loading.present();
    this.dishProvider.getDishes().subscribe(dishes => { loading.dismiss(), this.dishes = dishes },
      errmsg => { loading.dismiss(), this.dishErrMess = <any> errmsg });
  }

  dishSelected(dish: Dish) {
    this.navCtrl.push('DishdetailPage', {
      dish: dish
    })
  }

  addToFavorite(dish: Dish) {
    this.favoriteProvider.addFavorite(dish.id);
    this.toastCtrl.create({
      message: "Dish"+ dish.id + " successfully added to favorites",
      duration: 2000,
      position: 'bottom'
    }).present();
  }
}
