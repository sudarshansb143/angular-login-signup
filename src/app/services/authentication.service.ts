import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })


export class AuthenticateUser {
    private currentUser = {
        value: ""
    }
    
    constructor(private http: HttpClient){
    }
    public get currentUserValue() {
        return this.currentUser.value;
    }

    login(username: string, password: string) {
        return this.http.post(`http://localhost:3000/login`, { username, password })
            .pipe(map((response: any) => {
                // login successful if there's a jwt token in the response
                if (response && response.status) {
                    let {data} = response
                    let decodedToken = atob(data.token.split(".")[1])
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem("user", decodedToken)
                    localStorage.setItem("token", data.token)
                    return decodedToken;
                } else {
                    return false;
                }
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}