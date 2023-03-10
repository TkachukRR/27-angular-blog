import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import { User} from "../../../shared/interfaces";
import {Observable, Subject, throwError} from "rxjs";
import {environment} from "../../../../environments/environment";
import {catchError, tap} from "rxjs/operators";

@Injectable()
export class AuthService {
  public error$: Subject<string> = new Subject<string>()
  constructor(private http: HttpClient) {
  }

  get token(): string {
    const expiresDate: string = localStorage.getItem('fb-token-exp')

    if (new Date() > new Date(expiresDate)) {
      this.logout()
      return null
    }
    return localStorage.getItem('fb-token')
  }
  login(user: User): Observable<any> {
    user.returnSecureToken = true
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      )
  }

  private handleError(error: HttpErrorResponse){
    const {message} = error.error.error
      switch (message){
        case 'EMAIL_NOT_FOUND':
          this.error$.next('Email isn`t in DB')
          break
        case 'INVALID_PASSWORD':
          this.error$.next('Invalid password')
          break
        case 'INVALID_EMAIL':
          this.error$.next('Invalid email')
          break
      }
    return throwError(error)
  }

  logout(){
    this.setToken(null)
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  private setToken(response: any){
    if (response) {
      const expiresDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
      localStorage.setItem('fb-token', response.idToken)
      localStorage.setItem('fb-token-exp', expiresDate.toString())
    }

    if(!response) {
      localStorage.clear()
    }
  }
}
