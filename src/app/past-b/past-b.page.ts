import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Platform } from '@ionic/angular';

@Component({
 selector: 'app-past-b',
 templateUrl: './past-b.page.html',
 styleUrls: ['./past-b.page.scss'],
})
export class PastBPage implements OnInit {
  db = firebase.firestore();
  //array in a database for drivng school
  Drivingschool=[];
  NewDrivingschool=[];
  //for reviews
  reviews = [];
  Newreviews = [];
  avgRating = 0;
  ratingTotal = 0;

  viewImage = {
    image: '',
    open: false
  }


  constructor(private router: Router, public platform : Platform) { 
    this.db.collection('drivingschools').onSnapshot(snapshot => {
      this.NewDrivingschool = [];
     
      snapshot.forEach(Element => {
       
            this.Drivingschool.push(Element.data());
      });
      this.Drivingschool.forEach(item => {
      
        if(item.schooluid === firebase.auth().currentUser.uid){
                 this.NewDrivingschool.push(item);
             
                 
              }
      })
      
      console.log('NewDrivingschool', this.NewDrivingschool);
    
    });   
      //  this.avgRating=this.ratingTotal / this.reviews.length;
       
  }
  ionViewWillEnter(){
 this.openImage('', 'close');
    // this.platform.ready().then(() => {
    //   console.log('Core service init');
    //   const tabBar = document.getElementById('myTabBar');
    //    tabBar.style.display = 'none';
    // });


    firebase.auth().onAuthStateChanged(user => {
      this.db.collection('reviews').where('schooluid','==', user.uid).onSnapshot(snapshot => {
        snapshot.forEach(doc =>{
          console.log('Document : ', doc.data().image);
          
          this.ratingTotal += parseInt(doc.data().rating);
         this.reviews.push(doc.data());
         
        })
        this.avgRating = this.ratingTotal / this.reviews.length;
        console.log('revLeng', this.avgRating);
        console.log('reViews', this.reviews);
      })
    })
    
   
  }
  
    // this.db.collection('reviews').where('schooluid', '==', firebase.auth().currentUser.uid).get().then(res =>{
    //   res.forEach(doc =>{
    //     this.ratingTotal += doc.data().rating
    //     this.reviews.push(doc.data())
    //   })
    //   this.avgRating=this.ratingTotal/this.reviews.length
    // })
    // console.log('rating', this.avgRating);
 
  
  ngOnInit() {
  }
  goToGraph() {
    this.router.navigate(['graphs']);
  }
  openImage(image, cmd) {
    if (cmd == 'open') {
      this.viewImage.image = image;
      this.viewImage.open = true
    } else {
      this.viewImage.image = image;
      this.viewImage.open = false
    }
    
  }
}
