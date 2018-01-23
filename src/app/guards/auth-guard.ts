import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Cookie} from 'ng2-cookies/ng2-cookies';

 
@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(private router: Router) { }
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (Cookie.get('mail')) {
            return true;
        }
 
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
