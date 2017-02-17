import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostSingleComponent } from './posts/post-single/post-single.component';
import { PageListComponent } from './pages/pages-list/page-list.component';
import { PageSingleComponent } from './pages/pages-single/page-single.component';



const routes: Routes = [
  {
    path: '',
    component: PostListComponent,
    pathMatch: 'full'
  },
  {
    path: 'post/:slug',
    component: PostSingleComponent
  },
  {
    path: 'pages',
    component: PageListComponent
  },
  {
    path: 'pages/:slug',
    component: PageSingleComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class Wpng2RoutingModule { }
