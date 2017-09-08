import { Component, OnInit, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { FavoriteProvider } from '../../providers/favorite/favorite';
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
    @Inject('BaseURL') private BaseURL,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }

  ngOnInit() {
    let loading = this.loadingCtrl.create({
      content: "Loading . . . Please wait"
    });
    loading.present();
    this.favoriteProvider.getFavorites().subscribe(dishes => { loading.dismiss(), this.favorites = dishes }, 
      errmsg => { loading.dismiss(), this.errMess = errmsg });
  }

  removeFavorite(item: ItemSliding, id: number) {
    this.alertCtrl.create({
      title: 'Confirm delete favorite',
      message: 'Do you want to delete Dish '+ id + "?",
      buttons: [
        {
          text: "Cancel",
          role: 'cancel',
          handler: () => {
            console.log("Cancelled delete operation");
          }
        },
        {
          text: "Delete",
          handler: () => {
            console.log('Delete', id);
            let loading = this.loadingCtrl.create({
              content: "Deleting . . ."     
            });
            let toast = this.toastCtrl.create({
              message: "Dish" + id + " successfully deleted",
              duration: 3000
            });
            loading.present();
            this.favoriteProvider.removeFavorite(id).subscribe(dishes => { 
                loading.dismiss();
                this.favorites = dishes;
                toast.present();   
              },
              errmsg => this.errMess =errmsg
            );
            item.close();            
          }
        }
      ]
    }).present();
  }
}
