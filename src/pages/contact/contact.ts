import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import { CallNumber } from '@ionic-native/call-number';

/**
 * Generated class for the ContactPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private emailComposer: EmailComposer, 
    private callNumber: CallNumber
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

  sendMail() {
    let email = {
      to: "confusion@food.net",
      subject: "[ConFusion] Query",
      body: "Dear Sir/Madam:",
      isHtml: true
    }
    this.emailComposer.open(email)
      .then(() => console.log("Launching mail app"))
      .catch(() => console.log("Failed to launch mail app"));
  }

  dialNumber() {
    this.callNumber.callNumber("85212345678", true)
      .then(() => console.log("Launched dialer"))
      .catch(() => console.log("Error launching dialer"));
  }
}
