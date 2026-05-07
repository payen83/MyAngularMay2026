import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Api {
  // private baseURL: string = 'https://myexpressapr2026new-production.up.railway.app/api';
  private baseURL: string = 'http://localhost:3000/api';
  constructor(private http: HttpClient){

  }

  httpGet(path: string){
    let headers = {headers: new HttpHeaders};
    let fullURL: string = this.baseURL + path;
    return new Promise((resolve, reject)=>{
      this.http.get(fullURL, headers).subscribe({
        next: (response: any)=>{resolve(response)},
        error: (error: any) => {reject(error)}
      });
    });
  }

  httpPost(path: string, payload: any, method?: string){
    let fullURL: string = this.baseURL+path;
    let headers = {headers: new HttpHeaders};
    let token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJyYWhtYW5AbWFpbC5jb20iLCJpYXQiOjE3NzgxMzk5MjgsImV4cCI6MTc3ODE0MzUyOH0.CuAzh80pMWBZAXsoO0alJWb0is0bE301lA4IF6FU9T0';
    payload = {...payload, user_id: 1};

    if(token){
      headers = {headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      }).set('Content-Type', 'application/json')};
    }
    return new Promise((resolve, reject)=>{
      if(method == 'put'){
        this.http.put(fullURL, payload, headers).subscribe({
          next: (response: any)=>{resolve(response)},
          error: (error: any) => {reject(error)}
        });
      } else {
        this.http.post(fullURL, payload, headers).subscribe({
          next: (response: any)=>{resolve(response)},
          error: (error: any) => {reject(error)}
        });
      }

    })
  }
}
