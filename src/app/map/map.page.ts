import { Component, OnInit, ViewChild } from '@angular/core';
import * as firebase from 'firebase';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
declare var google;
// declare var axios;
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  // CSS properties ****************
  booking = {
    active: false,
    inactive: true
  }
  person = {
    default: true,
    expand: false
  }
  more = false;
   // CSS properties ****************

  //  referring to the div showing the map
  @ViewChild('map', {static: true}) showMap;
  db = firebase.firestore();

  infoWindow = new google.maps.InfoWindow;
  // restriction for the map
  SOUTH_AFRICAN_BOUNDS = {
    north: -21.914461,
    south: -35.800139,
    west: 15.905430,
    east: 34.899504
  }
  users = []
  mapCenter = {
    lat: 0,
    lng: 0
  }
  geoAccuracy: number;
  geoAddress: string;
  constructor(public loadingCtrl: LoadingController, public alertCtrl: AlertController, public toastCtrl: ToastController, private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder) { }

  ngOnInit() {
    // this.getusers();
    // this.getLocation();
  }
  setlocation(coords) {
    console.log(coords);
    
    this.infoWindow.setPosition(coords);
  }
  getLocation(){
    // map options
    // get the device geo location or handle any errors
    this.geolocation.getCurrentPosition(res => {
      this.mapCenter.lat = res.coords.latitude;
      this.mapCenter.lng = res.coords.longitude;
      this.geoAccuracy = res.coords.accuracy;

      const marker = {
        coords: {
          lat: res.coords.latitude,
        lng: res.coords.longitude
        },
        content: 'You',
        name: ''
      }
      
      this.infoWindow.setPosition(this.mapCenter);
      this.infoWindow.open(this.showMap);
      this.initMap();
      this.addMarker(marker);
    } , async err => {
      const alerter = await this.alertCtrl.create({
        message: 'Error getting location '+JSON.stringify(err)
      })
      alerter.present()
    })
  }
  mapOptions() {
    
    const mapOptions: google.maps.MapOptions = {
      center: this.mapCenter,
      disableDefaultUI: true, // disable a set of controls that display by default
      minZoom: 10, // limit to how much you can zoom out
      maxZoom: 17, // limit to how much you zoom in
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      restriction: {
        latLngBounds: this.SOUTH_AFRICAN_BOUNDS,
        strictBounds: false
      }
    }
    return mapOptions;
  }
  initMap(){
    // new map
    this.showMap = new google.maps.Map(this.showMap.nativeElement, this.mapOptions());
  }
  // add marker function 
  addMarker(props) {
    // add marker
    const marker = new google.maps.Marker({
      position: props.coords,
      map: this.showMap,
    })
    // check for custom icon
    if(props.iconImage) {
      // set custom icon
      marker.setIcon(props.iconImage)
    }

    // check for content
    if(props.content) {
      // set custom content
     let infoWindow = new google.maps.InfoWindow({
       content: `<h5 style="margin:0;padding:0;">${props.name} </h5>`+props.content
     });
     marker.addListener('click', () => {
      infoWindow.open(this.showMap, marker);
     })
    }
  }
  handleLoacationError (content, position) {
    this.infoWindow.setOptions(position);
    this.infoWindow.setContent(content);
    this.infoWindow.open(this.showMap)
  }
  togglePanel(){
    
    this.booking = {
      active: true,
      inactive: !this.booking.inactive
    }
  }
  showMore(){
    this.more = !this.more;
  }
  getusers(){
    this.db.collection('users').onSnapshot(snapshot => {
      snapshot.forEach(doc => {
        this.users.push(doc.data());
        this.addMarker(doc.data());
      })
    })
  }
  async acceptRequest(person) {
    const loading = await this.loadingCtrl.create({
      message: 'Working',
      spinner: 'lines'
    })
    loading.present();
    //copy the document from 'users' to 'accepted'
    this.db.collection('accepted').doc(person.content).set(person).then(res => {
      // delete the document from the 'users' collection
      this.db.collection('users').doc(person.content).delete().then(async res => {
        loading.dismiss();
        const toast = await this.toastCtrl.create({
          message: 'Request accepted',
          duration: 3000
        })
        toast.present();
      }).catch( async err => {
        loading.dismiss();
        console.log(err);
      const alerter = await this.alertCtrl.create({
        message: 'Something went wrong. Try again later.',
        buttons: [
          {
            text: 'Okay'
          }
        ]
      })
      })
      // catch any errors that happen during the creation
    }).catch(async err => {
      loading.dismiss();
      console.log(err);
      const alerter = await this.alertCtrl.create({
        message: 'Something went wrong. Please try again.',
        buttons: [
          {
            text: 'Okay'
          }
        ]
      })
    })
    
  }
  async declineRequests(person){
    const alerter = await this.alertCtrl.create({
      header: 'Decline Request?',
      message: `Are you sure you want to decline ${person.name}'s request?`,
      buttons: [
        {
          text: 'Yes',
          handler: async data => {
            const loader = await this.loadingCtrl.create({
              message: 'Working',
              spinner: 'lines'
            })
            loader.present();
            this.db.collection('users').doc(person.content).delete().then(async res=>{
              loader.dismiss()
              const toaster = await this.toastCtrl.create({
                message: 'Declined Request',
                duration: 3000
              })
              toaster.present()
            }).catch( async err => {
              loader.dismiss()
              const alerter = await this.alertCtrl.create({
                message: 'Something went wrong. Please try again later',
                buttons: [
                  {
                    text:'Okay'
                  }
                ]
              })
            })
          }
        },
        {
          text: 'No',
          role: 'cancel'
        }
      ]
    })
    alerter.present();
  }
}
