import { Component, OnInit, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment';
import { FavoriteProvider } from '../../providers/favorite/favorite';

/**
 * Generated class for the DishdetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage implements OnInit {
  dish: Dish;
  numcomments: number;
  avgstars: string;
  comments: Comment[];
  favorite: boolean;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    @Inject('BaseURL') private BaseURL,
    private favoriteProvider: FavoriteProvider
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }

  ngOnInit() {
    this.dish = this.navParams.get('dish');
    this.comments = this.dish.comments;
    this.numcomments = this.comments.length;
    let total = 0;
    this.comments.forEach(comment => total += comment.rating);
    this.avgstars = (total/this.numcomments).toFixed(2);
    this.favorite = this.favoriteProvider.isFavorite(this.dish.id);
  }

  ToggleFavorites() {
    console.log('Toggling Favorites', this.dish.id);
    this.favoriteProvider.toggleFavorite(this.dish.id);
    this.favorite = this.favoriteProvider.isFavorite(this.dish.id);
  }

}
