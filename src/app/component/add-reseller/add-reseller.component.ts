import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-add-reseller',
  templateUrl: './add-reseller.component.html',
  styleUrls: ['./add-reseller.component.css']
})
export class AddResellerComponent implements OnInit {

  constructor(private data:DataService) { }

  ngOnInit(): void {
  }

  userObj: User={
    id:'',
    name:'',
    email:'',
    password:'',
    credits:''
  };

  id: string = '';
  name: string = '';
  email: string = '';
  password: string = '';
  credits: string = '';

  resetForm() {
    this.id = '';
    this.name = '';
    this.email = '';
    this.password = '';
    this.credits = '';
  }

  addReseller() {
    if (this.name == '' || this.password == '' || this.email == '' || this.email == '') {
      alert('Fill all input fields');
      return;
    }

    this.userObj.id = '';
    this.userObj.name = this.name;
    this.userObj.email = this.email;
    this.userObj.password = this.password;
    this.userObj.credits = this.credits;

    this.data.signup(this.userObj);
    this.resetForm();

  }

  updateStudent() {

  }

  // deleteStudent(student: Student) {
  //   if (window.confirm('Are you sure you want to delete ' + student.first_name + ' ' + student.last_name + ' ?')) {
  //     this.data.deleteStudent(student);
  //   }
  // }

}
