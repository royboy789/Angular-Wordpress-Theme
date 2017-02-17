import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { WindowRef } from '../shared/windowRef';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { Page } from './page';

@Injectable()
export class PagesService {

  private _wpBase = "";

  constructor(private winRef: WindowRef, private http: Http) {
      let wp_info = winRef.nativeWindow;
      this._wpBase = wp_info.api_url;
  }

  getPages(): Observable<Page[]> {

      return this.http
        .get(this._wpBase + 'pages')
        .map((res: Response) => res.json());

  }

  getPage(slug): Observable<Page> {

      return this.http
        .get(this._wpBase + `pages?slug=${slug}`)
        .map((res: Response) => res.json());

  }

}
