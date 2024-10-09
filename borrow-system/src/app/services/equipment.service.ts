import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  private apiUrl = 'http://localhost:3000/equipment/all'; // URL ของ API ที่เชื่อมต่อกับ backend

  constructor(private http: HttpClient) { }

  // ฟังก์ชันสำหรับดึงข้อมูลอุปกรณ์ที่พร้อมให้ยืม
  getAvailableEquipments(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
