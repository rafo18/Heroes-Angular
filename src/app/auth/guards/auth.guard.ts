import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn:'root'
})

export class AuthGuard implements  CanLoad, CanActivate {

  constructor(private authService:AuthService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  Observable<boolean> | Promise<boolean> | boolean {

      if (this.authService.auth.id) {
        return true
      }

      console.log('Bloqueado por el AuthGuard - canActivate');


      return true
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

      if (this.authService.auth.id) {
        return true
      }

      console.log('Bloqueado por el AuthGuard - canLoad');

    return false
  }
}
