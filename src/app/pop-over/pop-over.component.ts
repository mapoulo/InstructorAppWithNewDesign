import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pop-over',
  templateUrl: './pop-over.component.html',
  styleUrls: ['./pop-over.component.scss'],
})
export class PopOverComponent implements OnInit {
  loginForm: FormGroup;
  
  users = {
    amount: '',
    name: '',
    number: '',
   
   
  }

  db = firebase.firestore();
  storage = firebase.storage().ref();
  businessdata = {
    amount: '',
    number: '',
    name: '',
    
    schooluid: ''
  }

  validation_messages = {
    'amount': [
      {type: 'required', message: 'schoolname is required.'},
   
    ],
    'name': [
     {type: 'required', message: 'registration is required.'},
     {type: 'minlength', message: 'registration must be atleast 6 char or more.'},
     {type: 'maxlength', message: 'registration must be less than 8 char or less'},
   ],
   'number': [
    {type: 'required', message: 'email is valid.'},
    {type: 'minlength', message: 'email is required.'},

  ],
 
  }
  router: any;

  constructor( public forms: FormBuilder) { 
    this.loginForm = this.forms.group({
      amount: new FormControl(this.businessdata.amount, Validators.compose([Validators.required])),
      name: new FormControl(this.businessdata.name, Validators.compose([Validators.required])),
      number: new FormControl(this.businessdata.number, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])),
     
      
    })


  }

  ngOnInit() {}



  async  createAccount(){
   
      this.db.collection('drivingschools').doc(firebase.auth().currentUser.uid).set({
        amount : this.businessdata.amount,
        name : this.businessdata.name,
        number : this.businessdata.number,
      
        schooluid : firebase.auth().currentUser.uid
      }).then(res => {
        console.log('Profile created');
        this.getProfile()
       
      }).catch(error => {
        console.log('Error');
      });
//allrt for time 
    }
    
  


  getProfile() {
    
    this.db.collection('drivingschools').where('schooluid', '==', firebase.auth().currentUser.uid).get().then(res => {
      res.forEach(doc => {
        console.log(doc.data());
        this.businessdata.amount = doc.data().amount
        this.businessdata.name = doc.data().name
        this.businessdata.number = doc.data().number
     
        
      })
     
    }).catch(err => {
      console.log(err);
      
    })
  }

  
  

}
