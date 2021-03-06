import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MemberEditComponent} from "./member-edit/member-edit.component";
import {MemberCardComponent} from "./member-card/member-card.component";
import {MemberListComponent} from "./member-list/member-list.component";
import {MemberDetailComponent} from "./member-detail/member-detail.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../_modules/shared.module";
import {RouterModule} from "@angular/router";
import { PhotoEditorComponent } from './photo-editor/photo-editor.component';
import {PaginationModule} from "ngx-bootstrap/pagination";
import {TimeagoModule} from "ngx-timeago";



@NgModule({
  declarations: [
    MemberEditComponent,
    MemberCardComponent,
    MemberListComponent,
    MemberDetailComponent,
    PhotoEditorComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    RouterModule,
    PaginationModule.forRoot(),
    TimeagoModule.forRoot(),
    ReactiveFormsModule
  ],
  exports: [
    FormsModule,
    CommonModule,
    SharedModule,
    RouterModule,
    PaginationModule,
    TimeagoModule,
    ReactiveFormsModule
  ]
})
export class MembersModule { }
