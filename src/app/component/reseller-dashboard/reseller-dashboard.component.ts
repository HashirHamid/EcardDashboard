import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-reseller-dashboard',
  templateUrl: './reseller-dashboard.component.html',
  styleUrls: ['./reseller-dashboard.component.css']
})
export class ResellerDashboardComponent implements OnInit {

  usersList: User[] = [];
  users:User[] = [];
  usersPerPage: number = 5;
  public selectedPage= 1;
  public pageIndex = 0;

  constructor( private data: DataService) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.pageIndex = (this.selectedPage - 1)*this.usersPerPage;
  }

  // register() {
  //   this.auth.logout();
  // }

  getAllUsers() {
    this.data.getAllusers().then((value)=>{
      this.usersList = value as User[];
      this.users = this.usersList.slice(this.pageIndex, this.usersPerPage);
      // console.log(cards);
    });
  }

  get pageNumbers(): number[]{
    return Array(Math.ceil(this.usersList.length / this.usersPerPage))
    .fill(0).map((x,i)=>i+1);
  }
  changePage(page:any){
    this.selectedPage = page;
    this.slicedProducts();
  }
  slicedProducts(){
    this.pageIndex = (this.selectedPage - 1)*this.usersPerPage;
    let endIndex = (this.selectedPage - 1)*this.usersPerPage + this.usersPerPage;
    this.users = [];
    this.users = this.usersList.slice(this.pageIndex, endIndex);
  }

}
