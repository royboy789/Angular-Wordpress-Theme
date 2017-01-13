import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { WindowRef } from './shared/windowRef';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  site_title: string;

  constructor(private winRef: WindowRef) {
    let wp_info = winRef.nativeWindow;
    this.site_title = wp_info.site_title;
  }



}
