import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) { }

  // ดึงข้อมูลผู้ใช้ทั้งหมด
  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  // ลงทะเบียนผู้ใช้ใหม่
  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // ล็อกอินผู้ใช้
  loginUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, userData);
  }
}
