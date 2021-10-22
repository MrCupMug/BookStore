import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthorInfContainerComponent } from './components/containers/author-info-container/author-inf-container.component';
import { AuthorsResolverService } from './services/authors-resolver.service';
import { AuthorsComponent } from './components/containers/authors/authors.component';

const routes: Routes = [
  {
    path: '',
    component: AuthorsComponent
  },
  {
    path: ':id',
    component: AuthorInfContainerComponent,
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
