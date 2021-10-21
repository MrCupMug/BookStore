import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';

import { AddBookPageComponent } from '../components/add-book/add-book-page/add-book-page.component';


@Injectable()
export class FormGuard implements CanDeactivate<AddBookPageComponent> {
  canDeactivate(
    component: AddBookPageComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const formValueArray = Object.values(component.form.value);
      const notEmpty = formValueArray.some((el) => !!el);

      if (!notEmpty) {
        this._close(component);

        return true;
      }

      const confirmed = confirm('Are you sure?');

      if (confirmed) {
        this._close(component);

        return true;
      }

      return false;

  }

  private _close(component: AddBookPageComponent): void {
    component.dialog.closeAll();
    component.form.reset();
  }

}
