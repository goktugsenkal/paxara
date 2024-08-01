import { Component } from '@angular/core';
import { AccountService } from '../account.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  errors: string[] | null = null;

  constructor(private accountService: AccountService, private router: Router){}

  loginForm = new FormGroup({
    displayName: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.pattern(/^.{6,}$/)]),
    //confirmPassword: new FormControl("", [Validators.required, Validators.pattern(/^.{6,}$/)]),
  })

  onSubmit(){
      this.accountService.register(this.loginForm.value).subscribe({
        next: () => this.router.navigateByUrl("/shop"),
        error: error => this.errors = error.errors
      })
    
  }
}
