import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ClaimRequest} from "../models/ClaimRequest";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
  }

  sendSubmitClaimRequest(requestBody: ClaimRequest) {
    let url = "http://localhost:8000/claim"
    console.log(requestBody)
    return this.http.post(url, requestBody, {
      observe: "response"
    })
  }

  getClaimsByMember(userId: string) {
    let url = `http://localhost:8000/claim/user/${userId}/view`
    return this.http.get(url, {
      observe: "response",
    })
  }

  getAllPendingClaims() {
    let url = "http://localhost:8000/claim/pending"
    return this.http.get(url, {
      observe: "response"
    })
  }
}
