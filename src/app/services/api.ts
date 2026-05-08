import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from './data';

@Injectable({
  providedIn: 'root',
})
export class Api {
  // private baseURL: string = 'https://myexpressapr2026new-production.up.railway.app/api';
  public baseURL: string = 'http://localhost:3000/api';
  constructor(
    private http: HttpClient,
    private dataService: Data
  ){

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
    let headers = { headers: new HttpHeaders() };
    // let token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJyYWhtYW5AbWFpbC5jb20iLCJpYXQiOjE3NzgxMzk5MjgsImV4cCI6MTc3ODE0MzUyOH0.CuAzh80pMWBZAXsoO0alJWb0is0bE301lA4IF6FU9T0';
    let token: string = this.dataService.loadStorage('TOKEN');
    let user: any = this.dataService.loadStorage('USER');
    let isFormData = payload instanceof FormData;
    if(user){
      if(isFormData){
        payload.append('user_id', user.id);
      } else {
        payload = {...payload, user_id: user.id};
      }
    }

    if(token){
      headers = {headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })};
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
