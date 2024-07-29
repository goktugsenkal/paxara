import { Component } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { error } from 'console';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrl: './test-error.component.scss'
})
export class TestErrorComponent {
  baseUrl = environment.apiUrl;
  validationErrors: string[] = [];

  constructor(private http: HttpClient) {}

  get404error(){
    this.http.get(this.baseUrl + "products/521").subscribe({
      next: response => console.log(response),
      error: (error) => {error}
    });
  }

  get500error(){
    this.http.get(this.baseUrl + "buggy/server").subscribe({
      next: response => console.log(response),
      error: (error) => {error}
    });
  }
  get400error(){
    this.http.get(this.baseUrl + "buggy/badrequest").subscribe({
      next: response => console.log(response),
      error: (error) => {error}
    });
  }
  get400ValidationError(){
    this.http.get(this.baseUrl + "buggy/badrequest/fortytwo").subscribe({
      next: response => console.log(response),
      error: (error) => {
        console.log(error);
        this.validationErrors = error.errors;
      }
    });
  }
}
