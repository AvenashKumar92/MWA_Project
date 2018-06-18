import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SubscribeService {

    serverUrl: string = "http://localhost:8080";
    constructor(
        private http: HttpClient
    ) {

    }


    getSubscriptions() {
        return this.http.get(this.serverUrl + '/subscriptions');
    }

    addSubscription() {
        return this.http.get(this.serverUrl + '/add/subscription');
    }

    removeSubscription() {
        return this.http.get(this.serverUrl + '/remove/subscription');
    }

}
