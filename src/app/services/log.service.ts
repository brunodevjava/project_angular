import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(
    private http: HttpClient
  ) { }

  private api = environment.apiUrl + 'log/';

  logout(id): any {
    return this.http.post(this.api, { id });
  }
}
