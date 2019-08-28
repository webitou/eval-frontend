// import { Component } from '@angular/core';
// import { ToastController } from 'ionic-angular';

// export class CoreController {
//   constructor(public toastCtrl: ToastController) {
//   }

//   showToast(msg: string) {
//     const toast = this.toastCtrl.create({
//       message: msg,
//       closeButtonText: 'Fermer',
//       showCloseButton: true
//     });
//     toast.present();
//   }
// }



// @Component({
//   selector: 'toast-example',
//   templateUrl: 'toast-example.html',
//   styleUrls: ['./toast-example.css'],
// })
// export class ToastExample {

//   constructor(public toastController: ToastController) {}

//   async presentToast() {
//     const toast = await this.toastController.create({
//       message: 'Your settings have been saved.',
//       duration: 2000
//     });
//     toast.present();
//   }

//   async presentToastWithOptions() {
//     const toast = await this.toastController.create({
//       header: 'Toast header',
//       message: 'Click to Close',
//       position: 'top',
//       buttons: [
//         {
//           side: 'start',
//           icon: 'star',
//           text: 'Favorite',
//           handler: () => {
//             console.log('Favorite clicked');
//           }
//         }, {
//           text: 'Done',
//           role: 'cancel',
//           handler: () => {
//             console.log('Cancel clicked');
//           }
//         }
//       ]
//     });
//     toast.present();
//   }

// }

