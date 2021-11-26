import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/account.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  showProgress = true;

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  accForm = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    email_id: new FormControl('', [Validators.required, Validators.email]),
    mobile_number: new FormControl('', [Validators.required]),
    mpin: new FormControl('', [Validators.required]),
  })

  addAccount() {
    console.log(this.accForm.value);
    this.accountService.createAccount(this.accForm.value).subscribe(
      data => {
        console.log(data);
      })
    this.showProgress=false;
    setTimeout(()=>{
      this.router.navigate(['account'])
    },3000)
  }

}
