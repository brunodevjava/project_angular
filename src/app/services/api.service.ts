import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  token: any;

  constructor(
    private http: HttpClient,
    private guard: AuthGuard

  ) {
  }
}
