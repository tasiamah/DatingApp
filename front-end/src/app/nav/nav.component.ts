import { Component, OnInit } from '@angular/core';
import {AccountService} from "../_services/account.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  isLoggedIn: boolean;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  login () {
    return this.accountService.login(this.model).subscribe(response => {
      console.log(response);
      this.isLoggedIn = true;
    }, error => {
      console.log(error);
    });
  }

  logout () {
    this.accountService.logout();
    this.isLoggedIn = false;
  }

  getCurrentUser() {
    this.accountService.currentUser$.subscribe(user => this.isLoggedIn = !!user,
      error => {
      console.log(error);
      });
  }
}


