import { Component } from '@angular/core';
import { IBeacon } from '@ionic-native/ibeacon/ngx';
import { IbeaconBean } from '../ibeacon-bean';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  beacons: IbeaconBean[] = [];
  zone: any;

  constructor(private ibeacon: IBeacon) {

    // Request permission to use location on iOS
    this.ibeacon.requestAlwaysAuthorization();
    // create a new delegate and register it with the native layer
    let delegate = this.ibeacon.Delegate();

    // Subscribe to some of the delegate's event handlers

    // this.delegate.didStartMonitoringForRegion()
    //   .subscribe(
    //     data => console.log('didStartMonitoringForRegion: ', data),
    //     error => console.error(error)
    //   );
    // this.delegate.didEnterRegion()
    //   .subscribe(
    //     data => {
    //       console.log('didEnterRegion: ', data);
    //     }
    //   );

    // let beaconRegion = this.ibeacon.BeaconRegion('deskBeacon', 'FDA50693-A4E2-4FB1-AFCF-C6EB07647825');

    // this.ibeacon.startMonitoringForRegion(beaconRegion)
    //   .then(
    //     () => console.log('Native layer received the request to monitoring'),
    //     error => console.error('Native layer failed to begin monitoring: ', error)
    //   );


  }

  ionViewDidLoad() {

  }

  openBlue(){
    this.ibeacon.isBluetoothEnabled().then(
      isEnabled=>{
        console.log("isEnabled: " + isEnabled);
        if (isEnabled) {
          this.ibeacon.disableBluetooth();
        } else {
          this.ibeacon.enableBluetooth();        
        }
      }
    ).finally(console.error);
  }

  //开始定位扫描
  startScan() {

    console.log('start new');
    let delegate = this.ibeacon.Delegate();

    delegate.didDetermineStateForRegion().subscribe(
      data => console.log('didDetermineStateForRegion: ', JSON.stringify(data)),
      error => console.error(error)
    )
    delegate.didStartMonitoringForRegion()
      .subscribe(
        data => console.log('didStartMonitoringForRegion: ', JSON.stringify(data)),
        error => console.error(error)
      );
    delegate.didRangeBeaconsInRegion()
      .subscribe(
        data => console.log('didRangeBeaconsInRegion: ', JSON.stringify(data)),
        error => console.error(error)
      );

    var uuid = 'FDA50693-A4E2-4FB1-AFCF-C6EB07647825';
    var identifier = 'deskBeacon';
    var minor = 10;
    var major = 7;
    let beaconRegion = this.ibeacon.BeaconRegion(identifier, uuid);

    this.ibeacon.setDelegate(delegate);

    this.ibeacon.startRangingBeaconsInRegion(beaconRegion)
      .then(
        (data) => {
          console.log(JSON.stringify(data['beacons']))
          this.beacons.push(data['beacons']);
          console.log('====>' + JSON.stringify(this.beacons));

          // let beaconList = data.beacons;
          // beaconList.forEach((beacon) => {
          //   let beaconObject = new IbeaconBean(beacon);
          //   this.beacons.push(beaconObject);
          // });
        },
        error => console.error(error)
      );

  };

  //停止定位扫描
  stopScan() {
    console.log('stop')

    var uuid = 'FDA50693-A4E2-4FB1-AFCF-C6EB07647825';
    var identifier = 'deskBeacon';
    var minor = 10;
    var major = 7;
    let beaconRegion = this.ibeacon.BeaconRegion(identifier, uuid);

    this.ibeacon.stopRangingBeaconsInRegion(beaconRegion)
      .then(
        data => console.log(data),
        error => console.error(error)
      );

  }


}
