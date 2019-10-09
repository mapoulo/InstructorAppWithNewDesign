import { Component, OnInit, ViewChild } from '@angular/core';
import * as Chart from 'chart.js';
import * as firebase from 'firebase';
@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.page.html',
  styleUrls: ['./graphs.page.scss'],
})
export class GraphsPage implements OnInit {
  
  @ViewChild('barChart', {static: false}) barChart;
//database 
db = firebase.firestore();
user = {
  uid: ''
}
mon = []
tue = []
wed = []
thu = []
fri = []
sat = []
sun = []
//array from database
// charts =[];

charts: any;
  colorArray: any;
  constructor() {

    
   }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(res => {
      this.user.uid = res.uid;
    })
    this.getRequests();
  }
  ionViewDidEnter() {
    
    
    
  }
  getRequests() {
    this.db.collection('request').where('schooluid', '==',this.user.uid).get().then(res => {
      console.log(res);
      
      res.forEach(doc => {
        console.log(doc.data());
        
        let date = doc.data().datecreated
        let newDate = date.split(" ")
        if (newDate[0] == "Mon") {
          this.mon.push(doc.data())
        } else if (newDate[0] == "Tue") {
          this.tue.push(doc.data())
        }else if (newDate[0] == "wed") {
          this.tue.push(doc.data())
        }
        else if (newDate[0] == "thu") {
          this.tue.push(doc.data())
        }
        else if (newDate[0] == "fri") {
          this.tue.push(doc.data())
        }
        else if (newDate[0] == "sat") {
          this.tue.push(doc.data())
        }
        else if (newDate[0] == "sun") {
          this.tue.push(doc.data())
        }
      })
      this.createBarChart();
      console.log(this.mon);
      
    }).catch(err => {
      console.log(err);
      
    })
  }

  createBarChart() {
    this.charts = new Chart(this.barChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
        datasets: [{
          label: 'Lessons offered per week',
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
}
