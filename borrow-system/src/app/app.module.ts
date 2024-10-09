import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // สำหรับจัดการฟอร์ม
import { provideHttpClient, withFetch } from '@angular/common/http'; // สำหรับเชื่อมต่อ API ด้วย fetch API
import { AppRoutingModule } from './app-routing.module'; // สำหรับการจัดการ Routing

// นำเข้าคอมโพเนนต์และบริการที่ต้องการ
import { AppComponent } from './app.component';
import { EquipmentListComponent } from './equipment-list/equipment-list.component';
import { BorrowComponent } from './borrow/borrow.component'; // คอมโพเนนต์การยืม
import { BorrowService } from './services/borrow.service'; // บริการการยืม
import { HomeComponent } from './home/home.component';
import { ReturnComponent } from './return/return.component'; // คอมโพเนนต์การคืน
import { ReturnService } from './services/return.service';
import { AddEditDeleteComponent } from './admin/add-edit-delete/add-edit-delete.component'; // คอมโพเนนต์สำหรับการจัดการเพิ่ม แก้ไข ลบ

@NgModule({
  declarations: [
    AppComponent,
    EquipmentListComponent,
    BorrowComponent,
    HomeComponent,
    ReturnComponent,
    AddEditDeleteComponent,
    // ประกาศคอมโพเนนต์อื่น ๆ ที่นี่
  ],
  imports: [
    BrowserModule,
    FormsModule, // สำหรับจัดการฟอร์ม
    AppRoutingModule // สำหรับการจัดการเส้นทาง
  ],
  providers: [
    BorrowService, 
    ReturnService, 
    provideHttpClient(withFetch()) // ใช้ fetch API แทน XMLHttpRequest
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
