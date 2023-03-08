import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../../../shared/interfaces";

@Injectable()
export class AuthService{
  constructor(private http: HttpClient) {
  }

  login(user: User) {
    this.http.post('', user)
  }

  logout(){}
}
