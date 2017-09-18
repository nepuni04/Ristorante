import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../shared/user';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup
  user: User = { username: '', password: '' };

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private viewCtrl: ViewController,
    private fb: FormBuilder,
    private storage: Storage,
    private modalCtrl: ModalController
  ) {

    this.createLoginForm();
    this.storage.get('user').then(user => {
      if(user) {
        this.user = user;
        this.loginForm.patchValue({
          username: this.user.username,
          password: this.user.password
        })
        console.log("User saved details", this.user);
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true
    })
  }

  onSubmit() {
    this.user = this.loginForm.value;
    console.log("User submitted details", this.user);
    if(this.loginForm.get('remember').value) {
      this.storage.set('user', this.user);
    }
    else {
      this.storage.remove('user');
    }
    this.viewCtrl.dismiss();
  }

  openRegister() {
    let modal = this.modalCtrl.create("RegisterPage");
    modal.present();
    modal.onDidDismiss(() => this.viewCtrl.dismiss());
  }
}
