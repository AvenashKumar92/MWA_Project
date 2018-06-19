import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../globals';

@Injectable()
export class RegistrationService {
    constructor(private http: HttpClient) {

    }

    registerUser(userPayload) {
        return this.http.post(Globals.RegUserAPI, userPayload);
    }
}
