/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PostsService } from './posts.service';

describe('Service: Posts', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostsService]
    });
  });

  it('should ...', inject([PostsService], (service: PostsService) => {
    expect(service).toBeTruthy();
  }));
});
