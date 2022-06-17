import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';



const USER_AUTH_API_URL = '/api-url';

@Injectable()
export class AuthenticationService {
}