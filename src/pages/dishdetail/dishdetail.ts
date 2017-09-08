import { Component, OnInit, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ModalController } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { CommentPage } from '../../pages/comment/comment';

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
    private favoriteProvider: FavoriteProvider,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController
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

  addToFavorites(id: number) {
    this.favoriteProvider.addFavorite(id);
    this.favorite = this.favoriteProvider.isFavorite(this.dish.id);
  }

  openActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: "",
      buttons: [
        {
          text: "Add to Favorites",
          handler: () => {
            this.addToFavorites(this.dish.id);
          }
        },
        {
          text: "Add a Comment",
          handler: () => {
            let commentModal = this.modalCtrl.create(CommentPage);
            commentModal.present();
            commentModal.onDidDismiss(data => {
              console.log(data);
              this.dish.comments.push(data);
            });
          }
        },
        {
          text: "Cancel",
          role: 'cancel',
          handler: () => {
            console.log("Action sheet closed");
          }
        }
      ]
    });
    actionSheet.present();
  }
}
