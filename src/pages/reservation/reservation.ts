import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
/**
 * Generated class for the ReservationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reservation',
  templateUrl: 'reservation.html',
})
export class ReservationPage {
  reservation: FormGroup;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private fb: FormBuilder, 
    private viewCtrl: ViewController
  ) {
    this.createForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservationPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  createForm() {
    let myDate: string = new Date().toISOString();
    this.reservation = this.fb.group({
      guests: 3,
      smoking: false,
      dateTime: [myDate, Validators.required]
    })
  }

  onSubmit() {
    console.log("Reservation details ", this.reservation.value);
    this.viewCtrl.dismiss();
  }
}
