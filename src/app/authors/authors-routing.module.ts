import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthorInfContainerComponent } from './containers/author-info-container/author-inf-container.component';
import { AuthorsResolverService } from './services/authors-resolver.service';
import { AuthorListContainerComponent } from './containers/author-list-container/author-list-container.component';
import { AuthorViewComponent } from './views/author-view/author-view.component';

const routes: Routes = [
  {
    path: '',
    component: AuthorListContainerComponent
  },
  {
    path: ':id',
    component: AuthorViewComponent,
    resolve: { author: AuthorsResolverService }
  },
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  providers: [AuthorsResolverService],
})
export class AuthorsRoutingModule { }
