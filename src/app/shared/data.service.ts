import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { User } from '../model/user';
import { Card } from '../model/card';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  isLoggedIn = false;

  constructor(private db: AngularFireDatabase, private fAuth: AngularFireAuth) { 
    
  }

  async signin(email: string , password: string){
    await this.fAuth.signInWithEmailAndPassword(email, password).then(
      res=>{
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(res.user));
      }
    );
  }

  async signup(user: User){
    await this.fAuth.createUserWithEmailAndPassword(user.email, user.password).then(
      res=>{
        this.isLoggedIn = true;
        console.log(res.user?.uid);
        this.addUser(user, res.user?.uid);
      }
    );
    
  }

  // // add student
  addUser(user: User, userid: any) {
    // user.id = this.db.createPushId();
  
    this.db.object('users/'+userid).set({
        id: userid,
        name: user.name,
        email: user.email,
        password: user.password,
        credits:user.credits,
        isAdmin:0
      });
  }

  // get all students
  getAllcards() {
    return new Promise((resolve, reject)=> {
      this.db.list('cards').snapshotChanges().subscribe(value=>{
        resolve(value);
      });
    });

  //   return this.httpClient.get('https://e-card-da934-default-rtdb.firebaseio.com/cards');
  }
  getAllusers() {
    return new Promise((resolve, reject)=> {
      this.db.list('users').valueChanges().subscribe(value=>{
        resolve(value);
      });
    });

  //   return this.httpClient.get('https://e-card-da934-default-rtdb.firebaseio.com/cards');
  }

  // delete student
  // async deleteCard(cardid : string) {
  //   console.log(cardid);
  //   await this.db.object('cards/-NF87NaU5ZTX4fcm8OMN').remove();
    //  this.afs.doc('/Students/'+student.id).delete();
  // }

  // update student
  // updateStudent(student : Student) {
  //   this.deleteStudent(student);
  //   this.addStudent(student);
  // }
    
}
