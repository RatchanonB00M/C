import { Component } from '@angular/core';
import { ReturnService } from '../services/return.service';

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.css']
})
export class ReturnComponent {
  returnData = {
    userId: '',
    equipmentId: ''
  };

  responseMessage: string = '';

  constructor(private returnService: ReturnService) {}

  onSubmit() {
    this.returnService.returnEquipment(this.returnData).subscribe(
      (response) => {
        this.responseMessage = response.message;
      },
      (error) => {
        this.responseMessage = error.error.message || 'เกิดข้อผิดพลาดในการคืนครุภัณฑ์';
      }
    );
  }
}
