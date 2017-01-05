import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { WindowRef } from './shared/windowRef';

import { AppComponent } from './app.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { Wpng2RoutingModule } from './app-routing.module';
import { PostSingleComponent } from './posts/post-single/post-single.component';


@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    PostSingleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Wpng2RoutingModule
  ],
  providers: [
      WindowRef
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
