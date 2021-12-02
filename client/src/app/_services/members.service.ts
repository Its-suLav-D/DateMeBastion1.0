import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Member } from '../models/member';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getMembers() {
    return this.http.get<Member[]>(`${this.baseUrl}/Users/all`);
  }

  getMember(id: string) {
    return this.http.get<Member>(`${this.baseUrl}/Users/${+id}`);
  }

  getMemberByUser(username: string) {
    return this.http.get<Member>(`${this.baseUrl}/Users/${username}`);
  }

  updateMember(member: Member) {
    return this.http.put(`${this.baseUrl}/Users/`, member);
  }

  addLike(username: string) {
    return this.http.post(`${this.baseUrl}/Likes/${username}`, {});
  }

  getLikes(predicate: string) {
    return this.http.get<Partial<Member[]>>(
      `${this.baseUrl}/Likes?predicate=${predicate}`
    );
  }
}
