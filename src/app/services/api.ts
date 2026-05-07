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
    let token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJyYWhtYW5AbWFpbC5jb20iLCJpYXQiOjE3NzgxNjg4MDgsImV4cCI6MTc3ODE3MjQwOH0.2wVeTU_A5PBrFQjBgphBxzSxt4N7BE9aNi2jgfZpqtI';
    // Check if payload is FormData (for file uploads)
    const isFormData = payload instanceof FormData;

    if (isFormData) {
      payload.append('user_id', '1');
    } else {
      payload = {...payload, user_id: 1};
    }

    if(token){
      if (isFormData) {
        
        // For FormData, don't set Content-Type as it will be set automatically with boundary
        headers = {headers: new HttpHeaders({
          Authorization: `Bearer ${token}`
        })};
      } else {
        // For JSON data, set Content-Type to application/json
        headers = {headers: new HttpHeaders({
          Authorization: `Bearer ${token}`
        }).set('Content-Type', 'application/json')};
      }
    }
    return new Promise((resolve, reject)=>{
      console.log(payload);
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
