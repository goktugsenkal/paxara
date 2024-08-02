import { Injectable, PLATFORM_ID } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AccountService } from '../../account/account.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private accountService: AccountService, private router: Router) {
    let currentUserToken = isPlatformBrowser(PLATFORM_ID) ? localStorage.getItem('token') : "return"
  this.loadCurrentUser(currentUserToken);
  }
  loadCurrentUser(currentUserToken: string | null) {
    if (token == null)
      {
        this.currentUserSource.next(null);
        return of(null);
      } 
  
      let headers = new HttpHeaders();
      headers = headers.set("Authorization", `Bearer ${token}`)
      return this.http.get<User>(this.baseUrl + "account", {headers}).pipe(
        map(user=>{
          if (user) {
            localStorage.setItem("token", user.token);
            this.currentUserSource.next(user);
            return user;
          }
          else{
            return null
          }
        })
      )
    }  }

  

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {     
      this.accountService.autoLogin(); 
    return this.accountService.currentUser$.pipe(
      take(2),
      map(user => {
        if (user) {
          debugger;
          console.log("user found");
          return true;
        }
        debugger;
        this.router.navigate(['account/login'], {queryParams: {returnUrl: state.url}});
        return false;
      })
    );
  }
}