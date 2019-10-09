import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import * as firebase from 'firebase';
import { Camera,CameraOptions } from '@ionic-native/Camera/ngx';
import { Router, NavigationEnd } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation'; 
import { PopoverController, IonItemSliding } from '@ionic/angular';
import { PopOverComponent } from '../pop-over/pop-over.component';
import { AlertController } from '@ionic/angular';
import { TabsService } from '../core/tabs.service';
import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { FormGroup, Validators,FormControl, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgZone } from '@angular/core';
// import { GooglePlaceDirective } from 'ngx-google-places-autocomplete/ngx-google-places-autocomplete.directive';
// import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { LoadingController } from '@ionic/angular';






@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

// NativeGeocoderResult


export class ProfilePage implements OnInit {

  public unsubscribeBackEvent: any;
  @ViewChild('inputs', {static: true}) input:ElementRef;
  // @ViewChild("placesRef", {static: true}) placesRef : GooglePlaceDirective;
  autocomplete : any;
  MyAddress : string;
  town_1 : string;
  myLatitude : number;
  myLongitude : number;
  textInButton : string;

//============================
  // GoogleAutocomplete: google.maps.places.AutocompleteService;
  // autocomplete: { input: string; };
  // autocompleteItems: any[];
  // location: any;
  // placeid: any;
  // myLocation: string;
  // address : string = "Enter your address";
//==============================
options2={
  types: [],
  componentRestrictions: { country: 'ZA' }
  }
 
  display = false;
  toastCtrl: any;

  option={
    componentRestrictions: { country: 'ZA' }
    };

  swipeUp() {
    this.display = !this.display;
  }
  
  loginForm: FormGroup;
  
  users = {
    schoolname: '',
    registration: '',
    email: '',
    cellnumber: '',
    cost: '',
    desc: '',
    open: '',
    closed: '',
    allday: '',
  //  name:'',
  //  number: '',
  //  amount:''
  }

  options : GeolocationOptions;
  currentPos : Geoposition;
  db = firebase.firestore();
  storage = firebase.storage().ref();


  
    amount: string = '';
    name: string = '';
    number: string = '';
    town : string;
    Address : string = '';
    longitude : string;
    latitude : string;
    Mylocation : string = "";

   pack = {
    amount: this.amount,
    name: this.name,
    number: this.number,
  }  
  
  opened : boolean

  businessdata = {
    schoolname: '',
    registration: '',
    image: '',
    email: '',
    cellnumber: '',
    cost: '',
    desc: '',
    address: '',
    packages : [],
    open: '',
    closed: '',
    allday: 'true',
    schooluid: '',
   
  }

  DrivingSchoolOwnerDetails = [];

  viewImage = {
    image: '',
    open: false
  }

  counter : number = 0;
  // now = moment().format('"hh-mm-A"');

  validation_messages = {
    'schoolname': [
      {type: 'required', message: 'schoolname is required.'},
   
    ],
    'registration': [
     {type: 'required', message: 'registration is required.'},
     {type: 'minlength', message: 'registration must be atleast 6 char or more.'},
     {type: 'maxlength', message: 'registration must be less than 8 char or less'},
   ],
   'email': [
    {type: 'required', message: 'email is valid.'},
    {type: 'minlength', message: 'email is required.'},

  ],
  'cellnumber': [
    {type: 'required', message: 'cellnumber is required.'},
    {type: 'minlength', message: 'cellnumber must be atleast 10 char or more.'},
    {type: 'maxlength', message: 'cellnumber must be less than 10 char or less'},
  ],
  'cost': [
    {type: 'required', message: 'cost is required.'},
    {type: 'minlength', message: 'cost is required.'},
    {type: 'maxlength', message: 'cost is required.'},
  ],
  'address': [
    {type: 'required', message: 'address is required.'},
    {type: 'minlength', message: 'address is required.'},
    {type: 'maxlength', message: 'address is required.'},
  ],
  'open': [
    {type: 'required', message: 'open is required.'},
    {type: 'minlength', message: 'open must be atleast 6 char or more.'},
    {type: 'maxlength', message: 'open must be less than 8 char or less'},
  ],
  'closed': [
    {type: 'required', message: 'closed is required.'},
    {type: 'minlength', message: 'closed must be atleast 6 char or more.'},
    {type: 'maxlength', message: 'closed must be less than 8 char or less'},
  ],
  'allday': [
    {type: 'required', message: 'Password is required.'},
    {type: 'minlength', message: 'password must be atleast 6 char or more.'},
    {type: 'maxlength', message: 'Password must be less than 8 char or less'},
  ]
  }

  

  profileForm: FormGroup
  profileImage: string;
  userProv: any;
  uploadprogress: number;
  isuploading: boolean;
  userProfile: any;
  isuploaded: boolean;
  imageSelected: boolean;
 tempData : string;
 showButton : boolean;
 showButton1 : boolean;

  constructor(
     public zone: NgZone,
     public formBuilder: FormBuilder ,
     private geolocation : Geolocation, 
     public forms: FormBuilder,
     public router:Router,
     public camera: Camera,
     public alertController: AlertController,
     public popoverController: PopoverController,
     public renderer: Renderer2, 
     public tabs: TabsService,
     public platform : Platform,
     public elementref: ElementRef, 
     public alert : LoadingController

     ) 

     {

         this.initAutocomplete();
      this.platform.ready().then(() => {
        console.log('Core service init');
        const tabBar = document.getElementById('myTabBar');
        tabBar.style.display = 'flex';
      });

      // this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
      // this.autocomplete = { input: '' };
      // this.autocompleteItems = [];

    
    this.loginForm = this.forms.group({
      // image: new FormControl(this.businessdata.image, Validators.compose([Validators.required])),
      schoolname: new FormControl(this.businessdata.schoolname, Validators.compose([Validators.required])),
    

      email: new FormControl(this.businessdata.email, Validators.compose([Validators.required])),

      cellnumber: new FormControl(this.businessdata.cellnumber, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])),

      cost: new FormControl(this.businessdata.cost, Validators.compose([Validators.required])),

      desc: new FormControl(this.businessdata.desc, Validators.compose([Validators.required])),

      // address: new FormControl(this.businessdata.address, Validators.compose([Validators.required])),

      open: new FormControl(this.businessdata.open, Validators.compose([Validators.required])),

      closed: new FormControl(this.businessdata.closed, Validators.compose([Validators.required]))

     
    })

    // this.rendere.setStyle(this.input.nativeElement, 'opacity', 'o');
    
  
    
  }



//   public handleAddressChange(address: Address) {
//     // Do some stuff
//     console.log(address);
    
// }
  //========================================

//=====================================


  ngOnInit() {
    
    this.initAutocomplete();
          let viewimage = this.elementref.nativeElement.children[0].children[0]
          console.log('ggg',viewimage);
          this.renderer.setStyle(viewimage, 'opacity', '0');
          this.renderer.setStyle(viewimage, 'transform', 'scale(0)');    
          
          
  }
  
  ionViewDidLoad(){
    this.initAutocomplete();
    this.initializeBackButtonCustomHandler();
    this.tempData = this.businessdata.schoolname;
    
  }

  ionViewWillLeave() {
    // Unregister the custom back button action for this page
    this.unsubscribeBackEvent && this.unsubscribeBackEvent();
  }

  ionViewWillEnter(){

    this.initAutocomplete();

    this.counter = 0;
    this.getUserPosition();


    this.db.collection('drivingschools').where('schooluid', '==', firebase.auth().currentUser.uid).get().then(res => {
    
      res.forEach(doc => {
        console.log(doc.data());
        this.tempData = doc.data().schoolname;
        this.businessdata.image = doc.data().image
        this.businessdata.schoolname = doc.data().schoolname
        this.businessdata.registration = doc.data().registration
        this.businessdata.email = doc.data().email
        this.businessdata.cellnumber = doc.data().cellnumber
        this.businessdata.cost = doc.data().cost
        this.businessdata.desc = doc.data().desc
        this.businessdata.open = doc.data().open
        this.businessdata.address = doc.data().address
        this.businessdata.closed = doc.data().closed
        this.businessdata.packages = doc.data().packages
      })

     this.pack = this.businessdata.packages[0];
     console.log(this.businessdata);
     this.tempData = this.businessdata.schoolname;
     console.log("Your values is", this.tempData === '');
     if(this.tempData === ''){
       this.showButton = true;
       this.textInButton = "Done";
       this.tempData = '';
     }else{
      this.showButton1 = true;
      this.textInButton = "Update";
      this.tempData = '';
     }
    
     
    }).catch(err => {
      console.log(err);
      
    })

   
  

    // this.db.collection('drivingschools').onSnapshot(snapshot => {
    //   this.DrivingSchoolOwnerDetails = [];
    //   snapshot.forEach(doc => {
       
    //     if (doc.data().schooluid === firebase.auth().currentUser.uid) {
    //       console.log("My data is", doc.data().address);
    //       this.Address = doc.data().address
    //       this.DrivingSchoolOwnerDetails.push({ docid: doc.id, doc: doc.data() });
    //     }
    //   });
    // });

     
    // if(this.DrivingSchoolOwnerDetails.length === 0){
    //   this.textInButton = "Done";
    //   console.log("Your length is vvv", this.DrivingSchoolOwnerDetails);  
    // }else{
    //   this.textInButton = "Update";
    //   console.log("Your length is aa", this.DrivingSchoolOwnerDetails);
    // }

  }

  ionViewDidEnter(){
    this.initAutocomplete();
  
  

    // this.platform.ready().then(() => {
    //   console.log('Core service init');
    //   const tabBar = document.getElementById('myTabBar');
    //    tabBar.style.display = 'none';
    // });

  }




  //============================

 initAutocomplete() {
  // Create the autocomplete object, restricting the search predictions to
  // geographical location types.
  this.autocomplete = new google.maps.places.Autocomplete(
    <HTMLInputElement>document.getElementById('autocomplete'), {types: ['geocode']});
   
   
  // Avoid paying for data that you don't need by restricting the set of
  // place fields that are returned to just the address components.
  // this.autocomplete.setFields(['address_component']);

  // When the user selects an address from the drop-down, populate the
  // address fields in the form.
  this.autocomplete.addListener('place_changed',()=> {this.fillInAddress()});
}

 fillInAddress() {

  // Get the place details from the autocomplete object.
  let place = this.autocomplete.getPlace();
 this.MyAddress = place.formatted_address;
  this.town_1 = place.address_components[2].long_name;
  this.myLatitude =  place.geometry.location.lat();
  this.myLongitude =  place.geometry.location.lng();
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
 geolocate() {
}
  //============================

  async initializeBackButtonCustomHandler(){
    this.platform.backButton.subscribeWithPriority(1, async () => {

      const alert = await this.alertController.create({
        header: '',
        message: 'Do you want to exit the App/',
        buttons: [
          {
            text: 'No',
            role: '',
            cssClass: '',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Yes',
            handler: () => {
              navigator['app'].exitApp();
            }
          }
        ]
      });
  
      await alert.present();
      // alert("Do you want to exit the App");
     

  });
  // this.unsubscribeBackEvent = this.platform.backButton.subscribeWithPriority(999999,  () => {
  //     // alert("back pressed home" + this.constructor.name);
     
  // });
  /* here priority 101 will be greater then 100 
  if we have registerBackButtonAction in app.component.ts */
}


  // updateSearchResults(){

  //   if (this.autocomplete.input == '') {
  //     this.autocompleteItems = [];
  //     return;
  //   }
  //   this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
  //   (predictions, status) => {
  //     this.autocompleteItems = [];
  //     this.zone.run(() => {
  //       predictions.forEach((prediction) => {
  //         this.autocompleteItems.push(prediction);
  //       });
  //     });
  //   });
  // }
  
  
  // selectSearchResult(item) {

  //   this.Address = item.description;
  //   console.log("Your address is",item.terms[1].value)
  //   this.Mylocation = item.terms[1].value;
  //   // this.town = location.split(', ')
  //   // console.log('secndary text', this.town[1]);
    
  //   // this.myLocation = item.description;
  //   // this.placeid = this.location.place_id;
  //   console.log('placeid'+ this.placeid);

  //   let options: NativeGeocoderOptions = {
  //     useLocale: true,
  //     maxResults: 5
  // };
  
  
  // this.nativeGeocoder.forwardGeocode(item.description, options)
  //   .then((result: NativeGeocoderResult[]) => {
  //     console.log('The coordinates are latitude=' + result[0].latitude + ' and longitude=' + result[0].longitude)
  //     this.longitude = result[0].longitude;
  //     this.latitude  =  result[0].latitude;
  //   } )
  //   .catch((error: any) => console.log(error));

  //   this.autocompleteItems = [];

  // }

  GoTo(){
    // return window.location.href = 'https://www.google.com/maps/place/?q=place_id:'+this.placeid;
    console.log("".toString() < "aA".toString());
    
  }
  //=========================================






  
  getUserPosition(){

    this.options = {
        enableHighAccuracy : true
    };
    this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {
        this.currentPos = pos;      
        console.log(pos);
        console.log('this is your Current Location', pos.coords.latitude);
    },(err : PositionError)=>{
        console.log("error : " + err.message);
    });

}


  showData(){
    // console.log('Data in the package',this.amount);
  }

  async addPack(){

   console.log('Your data is in the profile', {name: this.name, amount: this.amount, number: this.number});
   if(this.name !== '' && this.amount !== '' && this.number !== ''){
    
    this.businessdata.packages.push({name: this.name, amount: this.amount, number: this.number});
    this.counter += 1;
    console.log("The counter is", this.counter);
    this.name = "";
    this.number = "";
    this.amount = ""
   }else{

    const alert = await this.alertController.create({
          // header: 'Alert',
          // subHeader: 'Subtitle',
          message: 'Fields cannot be empty!',
          buttons: ['OK']
        });
        await alert.present();

   }
   
  
  
  
  
    // if(obj.amount !== '' && obj.name !== '' && obj.number !== '' && this.counter < 4){
    //   this.businessdata.packages.push({name: obj.name, amount:obj.amount, number:obj.number});
    //   // obj.name = '';
    //   // obj.amount = '';
    //   // obj.number = '';
    //   this.counter += 1;
    //   console.log('Package ',obj);
    //   console.log('Package ', this.counter);
    // }else{
    //   const alert = await this.alertController.create({
    //     // header: 'Alert',
    //     // subHeader: 'Subtitle',
    //     message: 'Fields cannot be empty!',
    //     buttons: ['OK']
    //   });
    //   await alert.present();
    // }



   
    // if (!this.pack.amount || !this.pack.name || !this.pack.number) {
    //   const alert = await this.alertController.create({
    //     header: 'Alert',
    //     subHeader: 'Subtitle',
    //     message: 'Please fill all package fields.',
    //     buttons: ['OK']
    //   });
  
    //   await alert.present();
      
    // } else {

    //   console.log('Pack added');
      
      // if (this.businessdata.packages.length !== 4) {
       
      // this.pack = {
      // amount: '',
      // name: '',
      // number: ''
      // }
      // }
    // }
  }

  async CheckData(){
  
    
    if(this.businessdata.closed.slice(11, 16) === this.businessdata.open.slice(11, 16) || this.businessdata.closed.slice(11, 16) < this.businessdata.open.slice(11, 16)){
      const alert = await this.alertController.create({
        // header: 'Alert',
        // subHeader: 'Subtitle',
        message: 'time canot not be the same .',
        buttons: ['OK']
      });
      await alert.present();
    }else{
      const alert = await this.alertController.create({
        // header: 'Alert',
        // subHeader: 'Subtitle',
        message: 'Well Done Buddy Way to Go!',
        buttons: ['OK']
      });
      await alert.present();
    }
     
}

  deletepack(index) {
    this.businessdata.packages.splice(index, 1);
    this.counter -= 1;
    console.log("Your value is", this.counter);
  }

  editpack(pack) {
    console.log('This is your pack',pack);
    this.pack = pack;
  }
  // options : GeolocationOptions;





  // image upload

  async selectImage(){

    let option: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
    }
    await this.camera.getPicture(option).then( res => {
      console.log(res);
      const image = `data:image/jpeg;base64,${res}`;

      this.profileImage = image;
      // const UserImage = this.storage.child(this.userProv.getUser().uid+'.jpg');
      let imageRef =this.storage.child('image').child('imageName');

    const upload = imageRef.putString(image, 'data_url');
     upload.on('state_changed', snapshot => {
       let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
       this.uploadprogress = progress;
       if (progress == 100){
        this.isuploading = true;

         if (this.uploadprogress == 100) {
           this.isuploading = false;
         } else {
           this.isuploading = true;
         }


       }
     }, err => {
     }, () => {
      upload.snapshot.ref.getDownloadURL().then(downUrl => {
        this.businessdata.image = downUrl;
        console.log('Image downUrl', downUrl);

        this.isuploaded = true;
      })
     })
    }, err => {
      console.log("Something went wrong: ", err);
    })
    this.imageSelected = true;

  }
  



  // await(){
  //   this.router.navigateByUrl('/Awaiting')
  // }
  //inserting driving drivers school details to the database 

  showTab(){
    
    this.platform.ready().then(() => {
      console.log('Core service init');
      const tabBar = document.getElementById('myTabBar');
      tabBar.style.display = 'flex';
    });
      
  }

  async  updateMyAccount(loginForm: FormGroup): Promise<void>{
 
    if(loginForm.valid){
     
     if(this.businessdata.closed.slice(11, 16)  != this.businessdata.open.slice(11, 16)  && this.businessdata.closed.slice(11, 16)  > this.businessdata.open.slice(11, 16)){

         if(this.MyAddress !== undefined){
          console.log("ssssssssssssssssssssss", this.MyAddress);
       
    
          this.db.collection('drivingschools').doc(firebase.auth().currentUser.uid).set({
            address: this.MyAddress,
            city : this.town_1,
            allday : this.businessdata.allday,
            cellnumber : this.businessdata.cellnumber,
            closed : this.businessdata.closed,
            cost : this.businessdata.cost,
            desc : this.businessdata.desc,
            email : this.businessdata.email,
            image : this.businessdata.image,
            open : this.businessdata.open,
            coords : {lat:  this.myLatitude,
              lng:  this.myLongitude},
            packages :this.businessdata.packages,
            schoolname : this.businessdata.schoolname,
            schooluid : firebase.auth().currentUser.uid           
          }, { merge: true }).then(res => {           
           console.log(res);
          }).catch(error => {
            console.log('Error');
          });
                
          const alert = await this.alertController.create({
            message: 'Profile updated successfully!',
            buttons: ['OK']
          });
          await alert.present();
         
         this.router.navigateByUrl('main');
         }else{

          const alert = await this.alertController.create({
            message: 'Please Enter the correct address!',
            buttons: ['OK']
          });     
          await alert.present();

         }
      
     }else{

       const alert = await this.alertController.create({
         message: 'Please Enter the correct time!',
         buttons: ['OK']
       });     
       await alert.present();

     }
    }else{

     const alert = await this.alertController.create({
       message: 'Fields cannot be empty!',
       buttons: ['OK']
     });     
     await alert.present();

    }

}


  async  createMyAccount(loginForm: FormGroup): Promise<void>{
 
       if(loginForm.valid){
        
        if(this.businessdata.closed.slice(11, 16)  != this.businessdata.open.slice(11, 16)  && this.businessdata.closed.slice(11, 16)  > this.businessdata.open.slice(11, 16)){

          console.log("ssssssssssssssssssssss", this.MyAddress);
          
       
          this.db.collection('drivingschools').doc(firebase.auth().currentUser.uid).set({
            address: this.MyAddress,
            city : this.town_1,
            allday : this.businessdata.allday,
            cellnumber : this.businessdata.cellnumber,
            closed : this.businessdata.closed,
            cost : this.businessdata.cost,
            desc : this.businessdata.desc,
            email : this.businessdata.email,
            image : this.businessdata.image,
            open : this.businessdata.open,
            coords : {lat:  this.myLatitude,
              lng:  this.myLongitude},
            packages :this.businessdata.packages,
            schoolname : this.businessdata.schoolname,
            schooluid : firebase.auth().currentUser.uid           
          }).then(res => {           
           console.log(res);
          }).catch(error => {
            console.log('Error');
          });
                
          const alert = await this.alertController.create({
            message: 'Profile successfully created!',
            buttons: ['OK']
          });
          await alert.present();
         
         this.router.navigateByUrl('main');
        }else{

          const alert = await this.alertController.create({
            message: 'Please Enter the correct time!',
            buttons: ['OK']
          });     
          await alert.present();

        }
       }else{

        const alert = await this.alertController.create({
          message: 'Fields cannot be empty!',
          buttons: ['OK']
        });     
        await alert.present();

       }

  }
 
  async  createAccount(loginForm: FormGroup): Promise<void>{
    
    console.log('Results in the businessdata', firebase.auth().currentUser.uid);
    

      // console.log('The data',this.businessdata.closed.slice(11, 16)  > this.businessdata.open.slice(11, 16)  );
      //   const tabBar = document.getElementById('myTabBar');
      //   tabBar.style.display = 'flex';
      // this.businessdata.closed.slice(11, 16)  != this.businessdata.open.slice(11, 16)  && this.businessdata.closed.slice(11, 16)  > this.businessdata.open.slice(11, 16)

        if (loginForm.valid ){
          if( this.businessdata.closed.slice(11, 16)  != this.businessdata.open.slice(11, 16)  && this.businessdata.closed.slice(11, 16)  > this.businessdata.open.slice(11, 16)){

             
         
              //  this.router.navigateByUrl('main');
               if(this.businessdata.schoolname === ''){


                this.db.collection('drivingschools').doc(firebase.auth().currentUser.uid).set({
                  address: this.MyAddress,
                  city : this.town_1,
                  allday : this.businessdata.allday,
                  cellnumber : this.businessdata.cellnumber,
                  closed : this.businessdata.closed,
                  cost : this.businessdata.cost,
                  desc : this.businessdata.desc,
                  email : this.businessdata.email,
                  image : this.businessdata.image,
                  open : this.businessdata.open,
                  coords : {lat:  this.myLatitude,
                    lng:  this.myLongitude},
                  packages :this.businessdata.packages,
                  registration : this.businessdata.registration,
                  schoolname : this.businessdata.schoolname,
                  schooluid : firebase.auth().currentUser.uid           
                }).then(res => {           
                  // console.log('Profile created');
                  // this.getProfile()
                  // this.router.navigateByUrl('the-map');
                }).catch(error => {
                  console.log('Error');
                });
    
                // this.platform.ready().then(() => {
                //   console.log('Core service init');
                //   const tabBar = document.getElementById('myTabBar');
                //   tabBar.style.display = 'flex';
                // });
                  
               
                const alert = await this.alertController.create({
                  // header: 'Alert',
                  // subHeader: 'Subtitle',
                  message: 'Profile successfully created!',
                  buttons: ['OK']
                });
                await alert.present();
               
               this.router.navigateByUrl('main');
               }else{

                console.log("ddddddddddddddddddddddddddddddddddddddddd");
                
                this.db.collection('drivingschools').doc(firebase.auth().currentUser.uid).set({
                  address: this.MyAddress,
                  city : this.town_1,
                  allday : this.businessdata.allday,
                  cellnumber : this.businessdata.cellnumber,
                  closed : this.businessdata.closed,
                  cost : this.businessdata.cost,
                  desc : this.businessdata.desc,
                  email : this.businessdata.email,
                  image : this.businessdata.image,
                  open : this.businessdata.open,
                  coords : {lat:  this.myLatitude,
                    lng:  this.myLongitude},
                  packages :this.businessdata.packages,
                  registration : this.businessdata.registration,
                  schoolname : this.businessdata.schoolname,
                  schooluid : firebase.auth().currentUser.uid           
                }).then(res => {           
                  // console.log('Profile created');
                  // this.getProfile()
                  // this.router.navigateByUrl('the-map');
                }).catch(error => {
                  console.log('Error');
                });
    
               
    
                const alert = await this.alertController.create({
                  // header: 'Alert',
                  // subHeader: 'Subtitle',
                  message: 'Profile successfully updated!',
                  buttons: ['OK']
                });
                await alert.present();

                this.router.navigateByUrl('main');

                // this.platform.ready().then(() => {
                //   console.log('Core service init');
                //   const tabBar = document.getElementById('myTabBar');
                //   tabBar.style.display = 'flex';
                // });
                  
               }
          

          }else{
            const alert = await this.alertController.create({
              // header: 'Alert',
              // subHeader: 'Subtitle',
              message: 'Enter the correct time!',
              buttons: ['OK']
            });     
            await alert.present();
          }   

        }else{
          const alert = await this.alertController.create({
            // header: 'Alert',
            // subHeader: 'Subtitle',
            message: 'Fields cannot be empty!',
            buttons: ['OK']
          });     
          await alert.present();
        }
       
}


      // async open(){
      //     console.log('The customers CheckintDate ',this.businessdata.open);
      //     console.log('Todays date is ', this.now);
      //     if(this.businessdata.open < this.now){
      //       const alert = await this.alertController.create({
      //         message: 'Please select the correct time.',
      //         buttons: ['OK']
      //       });
      //         alert.present();
      //     }else {
      //       this.businessdata.open = true;
      //     }
      //     console.log(this.businessdata.open);
      //   }
      
      //   closed(){
      //     console.log('The customers CheckOutDate ',  this.businessdata.closed );
      //     console.log('Todays date is ', this.now);
      //     if(this.businessdata.closed <  this.businessdata.closed){
      //       const alert = await this.alertController.create({
      //         message: 'Please select the correct time.',
      //         buttons: ['OK']
      //       });
      //         alert.present();
      //     }else if( this.businessdata.closed === undefined){
      //       const alert =  this.alert.create({
      //         message: 'Please select the Checkin time first.',
      //         buttons: ['OK']
      //       });
      //         alert.present();
      //     }else if (this.businessdata.closed === this.businessdata.closed){
      //       const alert = await this.alertController.create({
      //         message: 'open and closing time cannot not the same  cannot be on the same day.',
      //         buttons: ['OK']
      //       });
      //         alert.present();
      //     }else{
      //       this.businessdata.closed = true; 
      //       console.log("the checkout part");
      //     }
      //     console.log(this.businessdata.closed);
      //   }
      


      getProfile() {
      }

      goToRev() {
        this.router.navigate(['past-b']);
      } 


      profile() {
        this.router.navigate(['the-map']);
      } 


     async Logout() {

console.log('My value from the profile is ', this.tempData);
      this.tempData = '';
      console.log('My value from the profile is ', this.tempData);

        const alert = await this.alertController.create({
          header: '',
          message: 'Do you want to Logout?',
          buttons: [
            {
              text: 'No',
              role: '',
              cssClass: '',
              handler: (blah) => {
                
              }
            }, {
              text: 'Yes',
              handler: () => {
                console.log('You are logged out');
                firebase.auth().signOut().then((res) => {
                 console.log(res);
                  this.router.navigateByUrl('/login');
                })
              }
            }
          ]
        });
    
        await alert.present();
    }


      openImage(image, cmd) {
        // console.log('Open triggerd');
        console.log(this.elementref);
        
        if (cmd == 'open') {
          this.viewImage.image = image;
          this.viewImage.open = true;
          
          let viewimage = this.elementref.nativeElement.children[0].children[0]
          console.log('ggg',viewimage);
          this.renderer.setStyle(viewimage, 'opacity', '1');
          this.renderer.setStyle(viewimage, 'transform', 'scale(1)');
        } else {
          
          this.viewImage.open = false;
          let viewimage = this.elementref.nativeElement.children[0].children[0]
          console.log('ggg',viewimage);
          this.renderer.setStyle(viewimage, 'opacity', '0');
          this.renderer.setStyle(viewimage, 'transform', 'scale(0)');
        }
      }

    }

    