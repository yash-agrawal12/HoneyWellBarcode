import { Component, NgZone } from '@angular/core';
import { Device } from '@ionic-native/device/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  window: any = window;
  message: string ='';
  barcodes: string[] = [];
  status: string = 'Initialization... Are you on device?';

  constructor(public ngZone: NgZone,private device:Device,private platform: Platform){
    this.platform.ready().then(() => {
      // this.scanBarcode();
      
    this.device.manufacturer;
    console.log('Device '+ this.device.manufacturer);
    });

 
  }

  



  scanPressed () {
    this.window.plugins.honeywell.softwareTriggerStart((data: any) => {
      console.log(`Software scan: ${data}`);
      alert(`Software scan scanpressed: ${data}`)
      this.ngZone.run(() => {
        this.barcodes = [`${data} @ ${new Date().toISOString().replace(/[T,Z]/g, " ").split('.')[0]}`, ...this.barcodes]
      });
    }, 
      (error: any) => {
      console.log(`Error occured: ${error}`);
      this.ngZone.run(() => {
        this.barcodes = [`${error} @ ${new Date().toISOString().replace(/[T,Z]/g, " ").split('.')[0]}`, ...this.barcodes]
      });
    }
  );
  }
  scanReleased () {
    this.window.plugins.honeywell.softwareTriggerStop();
    alert(this.window.plugins.honeywell.softwareTriggerStop());
  }

  listen () {
    this.status = `enabled`;
    this.window.plugins.honeywell.listen((data: any) => {
      console.log(`Scanned: ${data}`);
      alert(`Software scan listen: ${data}`)
      this.ngZone.run(() => {
        this.barcodes = [`${data} @ ${new Date().toISOString().replace(/[T,Z]/g, " ").split('.')[0]}`, ...this.barcodes]
      });
    },
      (error: any) => {
        alert(`Error occured: ${error}`);
      console.log(`Error occured: ${error}`);
      this.ngZone.run(() => {
        this.barcodes = [`${error} @ ${new Date().toISOString().replace(/[T,Z]/g, " ").split('.')[0]}`, ...this.barcodes]
      });
    }
  );
  }

  disable () {
    this.status = `disabled`;
    this.window.plugins.honeywell.release((success: any) => {
      this.message = `DISABLE_SUCCESS: ${success}`
    }, (error: any) => {
      this.message = `DISABLE_ERROR: ${error}`;
    });
  }

  enable () {
    this.status='enabled';
    this.window.plugins.honeywell.claim((success: any) => {
      this.message = `ENABLE_SUCCESS: ${success}`
      this.listen();
    }, (error: any) => {
      this.message = `ENABLE_ERROR ${error}`;
    });
  }
 
  ngOnInit() {
    this.listen();
  }

  scaneNewFunc(){
    this.window.cordova.plugins.honeywell.barcode.onBarcodeScanned((result: { data: any; code: any; charset: any; aimId: any; timestamp: any; }) => {
      console.log("data", result.data); // actual barcode data
      alert('Data is Scanned'+result.data);
      // console.log("code", result.code);
      // console.log("charset", result.charset);
      // console.log("aim-id", result.aimId);
      // console.log("timestamp", result.timestamp);
  }, (error: any) => {
      console.error(error);
  })
  }
}
