import { LogService } from './../services/log.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private logService: LogService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    if (localStorage.getItem('token') && localStorage.getItem('token') !== 'null') {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }

  public getToken(): string {
    return <string>localStorage.getItem('token');
  }

  public setToken(token): void {
    localStorage.setItem('token', token);
  }

  public getGoogleAuth(): string {
    return <string>localStorage.getItem('googleAuth');
  }

  public setGoogleAuth(googleAuth): void {
    localStorage.setItem('googleAuth', googleAuth);
  }

  public getUser() {
    return JSON.parse(<string>localStorage.getItem('user'));
  }

  public getWorkflow() {
    return localStorage.getItem('workflow');
  }
  public getWorkflowId() {
    return localStorage.getItem('workflowId');
  }

  public login(user) {
    localStorage.setItem('user', JSON.stringify(user));
    this.setToken(user['token']);
  }

  public logout(): void {
    this.logService.logout(this.getUser().id).subscribe();
    sessionStorage.clear();
    localStorage.clear();
  }

  setPosition(position): void {
    localStorage.setItem('position', JSON.stringify(position));
  }

  // getPosition(): string {
  //   return localStorage.getItem('position') ? localStorage.getItem('position') : '';
  // }
}
