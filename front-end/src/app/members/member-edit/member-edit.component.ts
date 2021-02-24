import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../_services/account.service";
import {Member} from "../../_models/member";
import {User} from "../../_models/user";
import {MembersService} from "../../_services/members.service";
import {take} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";
import {FormsModule} from "@angular/forms";
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  member: Member;
  user: User;

  constructor(private accountService: AccountService,
              private memberService: MembersService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
    this.loadMember();
  }

  loadMember() {
    this.memberService.getMember(this.user.username).subscribe(member => this.member = member);
  }

  updateMember(){
    console.log(this.member);
    this.toastr.success('Profile updated successfully');
  }
}
