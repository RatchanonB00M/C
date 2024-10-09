import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:3000/api/admin'; // Base URL for your API

  constructor(private http: HttpClient) {}

  // Fetch all equipment
  getAllEquipment(): Observable<any[]> {
    console.log('Fetching all equipment');
    return this.http.get<any[]>(`${this.apiUrl}/get-all-equipment`);
  }

  // Add new equipment
  addEquipment(equipmentData: any): Observable<any> {
    console.log('Adding equipment:', equipmentData);
    return this.http.post(`${this.apiUrl}/add-equipment`, equipmentData);
  }

  // Edit equipment
  updateEquipment(equipmentId: string, equipmentData: any): Observable<any> {
    console.log('Updating equipment:', equipmentId, equipmentData);
    return this.http.put(`${this.apiUrl}/update-equipment/${equipmentId}`, equipmentData);
  }

  // Delete equipment
  deleteEquipment(equipmentId: string): Observable<any> {
    console.log('Deleting equipment with ID:', equipmentId);
    return this.http.delete(`${this.apiUrl}/delete-equipment/${equipmentId}`);
  }
}
