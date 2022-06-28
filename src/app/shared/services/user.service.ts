import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user.module';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  host = environment.host;
  constructor(private http: HttpClient) {}
  public getAllUser(): Observable<User[]> {
    return this.http.get<User[]>(this.host + '/user/users');
  }
  public getAllUserActive(): Observable<User[]> {
    return this.http.get<User[]>(this.host + '/user/getUserActive');
  }

  public getAllUserNoActive(): Observable<User[]> {
    return this.http.get<User[]>(this.host + '/user/getUserNoActive');
  }

  deleteUserById(id: number):Observable<void> {
    return this.http.delete<void>(this.host + '/user/delete/' + id);
  }
  saveUser(user:User): Observable<User> {
    return this.http.post<User>(this.host + '/user', user);
  }
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(this.host+"/user/"+id);
  }
  getUserByIdV2(id: number): Promise<User> {
    return this.http.get<User>(this.host+"/user/"+id).toPromise();
  }
  editUser(group: User): Observable<User> {
    return this.http.put<User>(this.host + '/user', group);
  }
  getUsersByPrivilege(privilege:string): Observable<User[]> {
    return this.http.get<User[]>(this.host + '/user/getUsersByPrivilege/'+privilege);
  }
  verifierPasswordUser(user:User,password:string): any {
    return this.http.post(this.host + '/user/verifierPassword/'+password,user);
  }
  verifierUserNameExiste(userName:string):any{
    return this.http.get(this.host + '/user/findUserByUserName/'+userName);
  }
  checkUserName(userName:string):any{
    return this.http.get(this.host + '/user/existUserName/'+userName);
  }
  getCurrentUser(): Observable<User> {
    return this.http.get<User>(this.host+"/user/getCurretnUser");
  }
  getCurrentUserWithPromise(): Promise<User> {
    return this.http.get<User>(this.host+"/user/getCurretnUser").toPromise();
  }
  getUserByIdWithPromise(id: number): Promise<User> {
    return this.http.get<User>(this.host+"/user/"+id).toPromise();
  }
  getDriversByIdRequest(id: number): Promise<User[]> {
    return this.http.get<User[]>(this.host+"/user/drivers/"+id).toPromise();
  }
}
