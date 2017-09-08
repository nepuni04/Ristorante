import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../../shared/comment';
/**
 * Generated class for the CommentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {
  commentForm: FormGroup;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private viewCtrl: ViewController,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }

  dismiss() {
    console.log("Comment modal dismissed");
    this.viewCtrl.dismiss();
  }

  createForm() {
    this.commentForm = this.fb.group({
      author: '',
      rating: 5,
      comment: ''
    });
  }

  onSubmit() {
    let comment: Comment = this.commentForm.value;
    comment.date = new Date().toISOString();
    console.log("Comment modal dismissed", comment);
    this.viewCtrl.dismiss(comment);
  }
}
