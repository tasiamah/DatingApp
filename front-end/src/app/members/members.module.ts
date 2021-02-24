import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MemberEditComponent} from "./member-edit/member-edit.component";
import {MemberCardComponent} from "./member-card/member-card.component";
import {MemberListComponent} from "./member-list/member-list.component";
import {MemberDetailComponent} from "./member-detail/member-detail.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../_modules/shared.module";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    MemberEditComponent,
    MemberCardComponent,
    MemberListComponent,
    MemberDetailComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    FormsModule,
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class MembersModule { }
