import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import * as Chart from 'chart.js';
import { Platform } from '@ionic/angular';
import { DataSavedService } from '../../app/data-saved.service'

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.page.html',
  styleUrls: ['./analytics.page.scss'],
})
export class AnalyticsPage implements OnInit {

viewImage = {
    image: '',
    open: false
  }
  @ViewChild('barChart', {static: false}) barChart;
//database 

public unsubscribeBackEvent: any;

db = firebase.firestore();
user = {
  uid: ''
}

Data = [];
NewData = [];

mon = []
tue = []
wed = []
thu = []
fri = []
sat = []
sun = []
//array from database
// charts =[];
NewDrivingschool=[];
Drivingschool=[];

charts: any;
  colorArray: any;
  constructor(private router: Router,
     private platform: Platform,
     public renderer: Renderer2, 
     public elementref: ElementRef, 
     public data : DataSavedService
     ) {

     


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

    
   }

  ngOnInit() {
   this.openImage('', 'close');
    firebase.auth().onAuthStateChanged(res => {
      this.user.uid = res.uid;
    })
    this.getRequests();
    // this.initializeBackButtonCustomHandler();
   
  }

  // ionViewWillLeave() {
  //   // Unregister the custom back button action for this page
  //   this.unsubscribeBackEvent && this.unsubscribeBackEvent();
  // }

//   initializeBackButtonCustomHandler(): void {

//     this.platform.backButton.subscribeWithPriority(1, () => {
//       alert("Do you want to exit the App");
//       navigator['app'].exitApp();
// });
  

//   // this.unsubscribeBackEvent = this.platform.backButton.subscribeWithPriority(999999,  () => {
//   //     // alert("back pressed home" + this.constructor.name);
     
//   // });
//   /* here priority 101 will be greater then 100 
//   if we have registerBackButtonAction in app.component.ts */
// }

  ionViewWillEnter() {
   
    console.log("Rejected data", this.data.DeclinedData);
    this.mon = [];
    this.tue = [];
    this.wed = [];
    this.thu = [];
    this.fri = [];
    this.sat = [];
    this.sun = [];
    console.log('Monday array',this.mon);
    
    this.platform.ready().then(() => {
      console.log('Core service init');
      const tabBar = document.getElementById('myTabBar');
       tabBar.style.display = 'flex';
    });

    this.db.collection('drivingschools').onSnapshot(snapshot => {
      this.Data = [];
      this.NewData = [];
     
      snapshot.forEach(Element => {
       
            this.Data.push(Element.data());
  
      });


      this.Data.forEach(item => {
      
        if(item.schooluid === firebase.auth().currentUser.uid){
                 this.NewData.push(item);
                 console.log('NewDrivingschool', this.NewData);  
              }
      })
  
  }); 

  
//  this.openImage('', 'close');
  this.getRequests();
 
}

  


  getRequests() {

    this.db.collection('bookings').where('schooluid', '==',firebase.auth().currentUser.uid).onSnapshot(res => {
    console.log(res);
    this.mon = [];
    this.tue = [];
    this.wed = [];
    console.log('wednday',  this.wed)
    this.thu = [];
    this.fri = [];
    this.sat = [];
    this.sun = [];
      res.forEach(doc => {
       
        let date = doc.data().datecreated
        let newDate = date.split(" ")
       
        
        if (newDate[0] == "Mon") {
          this.mon.push(doc.data())
        } else if (newDate[0] == "Tue") {
          this.tue.push(doc.data())
        }else if (newDate[0] == "Wed") {
          this.wed.push(doc.data())
        }
        else if (newDate[0] == "Thu") {
          this.thu.push(doc.data())
          console.log("The new Date is",this.thu.length);
        }
        else if (newDate[0] == "Fri") {
          this.fri.push(doc.data())
        }
        else if (newDate[0] == "Sat") {
          this.sat.push(doc.data())
        }
        else if (newDate[0] == "Sun") {
          this.sun.push(doc.data())
        }
      })
      this.createBarChart();
      console.log(this.mon);
      
    })

  }

  createBarChart() {

    this.charts = new Chart(this.barChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
        datasets: [{
          label: 'Lessons offered per day',
          // data: [this.mon.length, this.tue.length, this.wed.length, this.thu.length, this.fri.length, this.sat.length, this.sun.length],
           data: [this.mon.length, this.tue.length, this.wed.length, this.thu.length, this.fri.length, this.sat.length, this.sun.length],
          backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      

      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
}


showTab(){
  this.platform.ready().then(() => {
    console.log('Core service init');
    const tabBar = document.getElementById('myTabBar');
    tabBar.style.display = 'flex';
  });   
}


  goToPastB() {
    this.router.navigate(['past-b']);
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
