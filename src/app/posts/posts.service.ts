import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { Post } from './post';

@Injectable()
export class PostsService {

  private _wpBase = "http://local.wordpress.dev/wp-json/wp/v2/";

  constructor(private http: Http) { }

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
