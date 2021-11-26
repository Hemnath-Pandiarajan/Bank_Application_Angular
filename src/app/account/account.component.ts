import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { Account } from '../model/account';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  error = false;
  message : string = 'hi';
  accounts: any = [];
  headElements = ['S.no', 'Account No', 'Cif.no', 'First name', 'Last name', 'Email', 'Mobile', 'mPin'];
  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.accountService.getAllAccount().subscribe(data => {
      this.accounts = data;
      console.log(data);
    })
  }

  goToAccountDetail(id: number) {
    this.router.navigate(['account-detail', id]);
  }

  deleteAccount(id: number) {
    this.accountService.deleteAccount(id).subscribe(data => {
      console.log(data);
    })
    setTimeout(()=>{
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
          console.log(currentUrl);
      });
    },1500);
  }

}
