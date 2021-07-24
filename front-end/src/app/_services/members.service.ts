import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Member} from "../_models/member";
import {Observable, of, pipe} from 'rxjs';
import {map} from "rxjs/operators";
import {PaginatedResult} from "../_models/pagination";
import {UserParams} from "../_models/userParams";


@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  memberCache = new Map();

  constructor(private http: HttpClient) {
  }

  getMembers(userParams: UserParams): Observable<PaginatedResult<Member[]>>{
    const response = this.memberCache.get(Object.values(userParams).join('-'));
    if (response) {
      return of(response);
    }

    const params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize)
      .append('minAge', userParams.minAge.toString())
      .append('maxAge', userParams.maxAge.toString())
      .append('gender', userParams.gender)
      .append('orderBy', userParams.orderBy);

    return this.getPaginatedResult<Member[]>(this.baseUrl + 'users', params)
      .pipe(map(res => {
      this.memberCache.set(Object.values(userParams).join('-'), res);
      return res;
    }));
  }

  getMember(username: string): Observable<Member> {
    const member = this.members.find(x => x.username === username);
    if (member !== undefined) { return of(member); }
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(member: Member): Observable<void> {
    return this.http.put<Member>(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    );
  }

  deletePhoto(photoId: number): Observable<object> {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }

  setMainPhoto(photoId: number): Observable<object> {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }

  private getPaginatedResult<T>(url, params): Observable<PaginatedResult<T>> {
    const paginatedResult = new PaginatedResult<T>();
    return this.http.get<T>(url, {observe: 'response', params}).pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
  }

  private getPaginationHeaders(pageNumber: number, pageSize: number): HttpParams {
    const params = new HttpParams()
      .append('pageNumber', pageNumber.toString())
      .append('pageSize', pageSize.toString());

    return params;

  }
}
