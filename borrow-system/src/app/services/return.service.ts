import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReturnService {

  private apiUrl = 'http://localhost:3000/api/return'; // URL ของ API สำหรับคืนครุภัณฑ์

  constructor(private http: HttpClient) { }

  // ฟังก์ชันสำหรับคืนครุภัณฑ์
  returnEquipment(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
