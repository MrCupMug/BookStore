import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IAuthor } from '../interfaces/authors.interface';
import { AuthorsService } from './authors.service';

@Injectable()
export class AuthorsResolverService implements Resolve<IAuthor> {

  constructor(
    private readonly authorsService: AuthorsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAuthor> {
    const id = route.params.id;
    return this.authorsService.getAuthor(id);
  }
}
