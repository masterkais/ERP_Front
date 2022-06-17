import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Group } from '../models/group.model';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  host = environment.host;
  constructor(private http: HttpClient) {}
  public getAllGroup(): Observable<Group[]> {
    return this.http.get<Group[]>(this.host + '/group/groups');
  }
  searchGroupsByPrevileage(keyword: String): Observable<Group[]> {
    return this.http.get<Group[]>(this.host + '/group/search/' + keyword);
  }
  deleteGroupById(id: number):Observable<void> {
    return this.http.delete<void>(this.host + '/group/delete/' + id);
  }
  saveGroup(group: Group): Observable<Group> {
    return this.http.post<Group>(this.host + '/group', group);
  }
  getGroupById(id: number): Observable<Group> {
    return this.http.get<Group>(this.host+"/group/"+id);
  }
  editGroup(group: Group): Observable<Group> {
    return this.http.put<Group>(this.host + '/group', group);
  }
}
