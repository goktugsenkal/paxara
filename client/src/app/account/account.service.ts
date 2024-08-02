import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, map, of, ReplaySubject } from 'rxjs';
import { User } from '../shared/models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<User | null>(null );
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router
) {
  let currentUserToken = isPlatformBrowser(PLATFORM_ID) ? localStorage.getItem('token') : "return"
  this.loadCurrentUser(currentUserToken);
  }

  loadCurrentUser(token: string | null){
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
  }

  login(values: any){
    return this.http.post<User>(this.baseUrl + "account/login", values).pipe(
      map(user=>{
        localStorage.setItem("token", user.token);
        this.currentUserSource.next(user);
      })
    );
  }

  autoLogin(){
    const userData = localStorage.getItem("token");
    if (!userData) {
      this.currentUserSource.next(null);
      return
    }
    this.login(userData);
  }

  register(values: any){
    return this.http.post<User>(this.baseUrl + "account/register", values).pipe(
      map(user=>{
        localStorage.setItem("token", user.token);
        this.currentUserSource.next(user);
      })
    );
  }

  logout(){
    localStorage.removeItem("token");
    this.currentUserSource.next(null);
    this.router.navigateByUrl("/");
  }

  checkEmailExists(email: string){
    return this.http.get<boolean>(this.baseUrl + "account/emailexists?email=" + email);
  }
}
