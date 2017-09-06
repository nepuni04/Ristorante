import { Component, OnInit, Inject } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DishProvider } from '../../providers/dish/dish';
import { LeaderProvider } from '../../providers/leader/leader';
import { PromotionProvider } from '../../providers/promotion/promotion';
import { Dish } from '../../shared/dish';
import { Leader } from '../../shared/leader';
import { Promotion } from '../../shared/promotion';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  dishErrMess: string;
  promoErrMess: string;
  leaderErrMess: string;

  constructor(public navCtrl: NavController, 
    private dishProvider: DishProvider,
    private leaderProvider: LeaderProvider,
    private promotionProvider: PromotionProvider,
    @Inject('BaseURL') private BaseURL
  ) {}

  ngOnInit() {
    this.dishProvider.getFeaturedDish().subscribe(dish => this.dish = dish,
      errmsg => this.dishErrMess = <any> errmsg);
    this.leaderProvider.getFeaturedLeader().subscribe(leader => this.leader = leader,
      errmsg => this.leaderErrMess = <any> errmsg);
    this.promotionProvider.getFeaturedPromotion().subscribe(promotion => this.promotion = promotion,
      errmsg => this.promoErrMess = <any> errmsg);    
  }
}
