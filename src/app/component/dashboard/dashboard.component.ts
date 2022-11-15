import { Component, OnInit, ViewChild } from '@angular/core';
import { Card } from 'src/app/model/card';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';
import * as $ from 'jquery';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  cardsList: Card[] = [];
  cards:Card[] = [];
  cardsPerPage: number = 5;
  public selectedPage= 1;
  public pageIndex = 0;

  constructor(private db:AngularFireDatabase, private data: DataService) { }

  ngOnInit(): void {
    this.getAllCards();
    this.pageIndex = (this.selectedPage - 1)*this.cardsPerPage;
  }
  getAllCards() {
    this.data.getAllcards().then((value)=>{
      this.cardsList = value as Card[];
      this.cards = this.cardsList.slice(this.pageIndex, this.cardsPerPage);
    });
  }
  get pageNumbers(): number[]{
    return Array(Math.ceil(this.cardsList.length / this.cardsPerPage))
    .fill(0).map((x,i)=>i+1);
  }
  changePage(page:any){
    this.selectedPage = page;
    this.slicedProducts();
  }
  slicedProducts(){
    this.pageIndex = (this.selectedPage - 1)*this.cardsPerPage;
    let endIndex = (this.selectedPage - 1)*this.cardsPerPage + this.cardsPerPage;
    this.cards = [];
    this.cards = this.cardsList.slice(this.pageIndex, endIndex);
  }
  delCard(cardid: string) {
    console.log(this.cardsList);
    // this.data.deleteCard(cardid);
    this.getAllCards();
  }
}
