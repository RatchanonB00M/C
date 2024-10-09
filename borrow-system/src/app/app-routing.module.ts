import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipmentListComponent } from './equipment-list/equipment-list.component';
import { BorrowComponent } from './borrow/borrow.component';
import { HomeComponent } from './home/home.component';
import { ReturnComponent } from './return/return.component'; // Import the return component
import { AddEditDeleteComponent } from './admin/add-edit-delete/add-edit-delete.component'; // Import the new combined component

const routes: Routes = [
  { path: 'equipments', component: EquipmentListComponent }, // เส้นทางสำหรับรายการอุปกรณ์
  { path: 'borrow', component: BorrowComponent }, // เส้นทางสำหรับการยืมอุปกรณ์
  { path: 'return', component: ReturnComponent }, // เส้นทางสำหรับการส่งคืนอุปกรณ์
  { path: 'admin/op', component: AddEditDeleteComponent }, // เส้นทางสำหรับการจัดการเพิ่ม แก้ไข ลบ ตามการดำเนินการ
  { path: 'home', component: HomeComponent }, // เส้นทางสำหรับโฮม
  { path: '', redirectTo: '/home', pathMatch: 'full' } // เส้นทางเริ่มต้นไปยังโฮม
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }