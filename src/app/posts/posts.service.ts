import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { WindowRef } from '../shared/windowRef';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { Post } from './post';

@Injectable()
export class PostsService {

  private _wpBase = "";

  constructor(private winRef: WindowRef, private http: Http) {
      let wp_info = winRef.nativeWindow;
      this._wpBase = wp_info.api_url;
  }

  getPosts(): Observable<Post[]> {

      return this.http
        .get(this._wpBase + 'posts')
        .map((res: Response) => res.json());

  }

  getPost(slug): Observable<Post> {

      return this.http
        .get(this._wpBase + `posts?filter[name]=${slug}`)
        .map((res: Response) => res.json());

  }

}
