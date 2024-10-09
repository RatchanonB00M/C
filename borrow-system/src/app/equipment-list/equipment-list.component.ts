import { Component, OnInit } from '@angular/core';
import { EquipmentService } from '../services/equipment.service';

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.css']
})
export class EquipmentListComponent implements OnInit {
  equipments: any[] = [];

  constructor(private equipmentService: EquipmentService) { }

  ngOnInit(): void {
    this.loadAvailableEquipments();
  }

  // ฟังก์ชันสำหรับดึงข้อมูลครุภัณฑ์จาก service
  loadAvailableEquipments(): void {
    this.equipmentService.getAvailableEquipments().subscribe(
      (data) => {
        this.equipments = data;
      },
      (error) => {
        console.error('Error loading available equipments', error);
      }
    );
  }
}
