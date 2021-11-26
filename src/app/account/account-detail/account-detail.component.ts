import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/account.service';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit {

  showProgress = true;
  id: number;
  updateAccountForm;
  accountData;
  headElements = ['Account No', 'Cif.no', 'First name', 'Last name', 'Email', 'Mobile', 'mPin'];
  constructor(
    private accountService: AccountService,
    private router: ActivatedRoute,
    private route : Router
  ) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'];
    this.getAccountById(this.id);
  }

  getAccountById(id: number) {
    this.accountService.getAccountById(id).subscribe(data => {
      this.accountData = data;
      console.log(data);
      this.updateAccountForm = new FormGroup({
        first_name: new FormControl(this.accountData.first_name),
        last_name: new FormControl(this.accountData.last_name),
        email_id: new FormControl(this.accountData.email_id),
        mobile_number: new FormControl(this.accountData.mobile_number),
        mpin: new FormControl(this.accountData.mpin)
      })
    })
  }

  onSubmit() {
    this.showProgress = false;
    console.log(`>>>${this.updateAccountForm.value}`);
    this.accountService.updateAccount(this.id, this.updateAccountForm.value).subscribe( data => {
    console.log(data)});
    setTimeout(()=>{
      this.route.navigate(['account'])
    },3000)
  }
}
