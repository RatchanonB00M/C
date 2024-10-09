import { Component } from '@angular/core';
import { BorrowService } from '../services/borrow.service';

@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.component.html',
  styleUrls: ['./borrow.component.css']
})
export class BorrowComponent {
  borrowData = {
    userId: '',
    equipmentId: '',
    borrowDate: '',
    purpose: '',
    location: ''
  };
  responseMessage: string = '';

  constructor(private borrowService: BorrowService) {}

  onSubmit() {
    this.borrowService.borrowEquipment(this.borrowData).subscribe(
      (response: any) => {
        this.responseMessage = 'ยืมครุภัณฑ์สำเร็จ';
      },
      (error) => {
        this.responseMessage = 'เกิดข้อผิดพลาดในการยืมครุภัณฑ์';
      }
    );
  }
}
