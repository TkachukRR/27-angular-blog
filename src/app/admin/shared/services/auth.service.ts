import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { User} from "../../../shared/interfaces";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {tap} from "rxjs/operators";

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {
  }

  get token(): string | null {
    const expiresDate: string = localStorage.getItem('fb-token-exp') || ''

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
        tap(this.setToken)
      )
  }

  logout(){}

  isAuthenticated(): boolean {
    return !!this.token
  }

  private setToken(response: any){
    console.log(response)
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
