import { Component, OnInit, Inject } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';
import { IonicPage, NavController, NavParams, ActionSheetController, ToastController, ModalController } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment';
import { FavoriteProvider } from '../../providers/favorite/favorite';
/*import { CommentPage } from '../../pages/comment/comment';*/

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
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private socialSharing: SocialSharing
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
            this.toastCtrl.create({
              message: "Dish" + this.dish.id + " successfully added to favorites",
              duration: 2000
            }).present();
          }
        },
        {
          text: "Add a Comment",
          handler: () => {
            let commentModal = this.modalCtrl.create('CommentPage');
            commentModal.present();
            commentModal.onDidDismiss(data => {
              if(data) {
                console.log(data);
                this.dish.comments.push(data);
              }
            });
          }
        },
        {
          text: 'Share via Facebook',
          handler: () => {
            this.socialSharing.shareViaFacebook(this.dish.name + ' -- ' + this.dish.description, this.BaseURL + this.dish.image, '')
              .then(() => console.log('Posted successfully to Facebook'))
              .catch(() => console.log('Failed to post to Facebook'));
          }
        },
        {
          text: 'Share via Twitter',
          handler: () => {
            this.socialSharing.shareViaTwitter(this.dish.name + ' -- ' + this.dish.description, this.BaseURL + this.dish.image, '')
              .then(() => console.log('Posted successfully to Twitter'))
              .catch(() => console.log('Failed to post to Twitter'));
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
