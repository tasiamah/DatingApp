import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode: boolean;
  users: any;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  registerToggle () {
    this.registerMode = !this.registerMode;
  }

  getUsers(): void {
    this.http.get('https://localhost:5001/api/users')
      .subscribe(response => this.users = response);
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }
}
