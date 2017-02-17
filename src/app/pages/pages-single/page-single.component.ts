import { Component, OnInit } from '@angular/core';
import { Page } from '../page';
import { PagesService } from '../pages.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-post-single',
  templateUrl: './page-single.component.html',
  styleUrls: ['./page-single.component.css'],
  providers: [PagesService]
})
export class PageSingleComponent implements OnInit {

  page: Page;

  constructor( private pagesService: PagesService, private route: ActivatedRoute ) { }

  getPage(slug){
    this.pagesService
      .getPage(slug)
      .subscribe(res => {
        this.page = res[0];
      });
  }

  ngOnInit() {

    this.route.params.forEach((params: Params) => {
       let slug = params['slug'];
       this.getPage(slug)
    });

  }

}
