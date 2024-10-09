import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service'; 

@Component({
  selector: 'app-add-edit-delete',
  templateUrl: './add-edit-delete.component.html',
  styleUrls: ['./add-edit-delete.component.css']
})
export class AddEditDeleteComponent {
  // Separate data models for add, edit, and delete operations
  addEquipmentData: any = { equipmentId: '', equipmentName: '', description: '', status: '', purchaseDate: '', category: '' };
  editEquipmentData: any = { equipmentId: '', equipmentName: '', description: '', status: '', purchaseDate: '', category: '' };
  deleteEquipmentData: any = { equipmentId: '' };

  responseMessage: string = '';

  constructor(private adminService: AdminService) {}

  onSubmit(operation: string) {
    console.log('Operation:', operation); // Check the operation type (add, edit, delete)

    if (operation === 'add') {
      console.log('Add Equipment Data:', this.addEquipmentData); // Log the data being sent
      this.adminService.addEquipment(this.addEquipmentData).subscribe(
        response => {
          this.responseMessage = 'Equipment added successfully!';
          console.log('Response:', response); // Log the response from the API
        },
        error => {
          this.responseMessage = 'Error adding equipment.';
          console.log('Error:', error); // Log any error from the API
        }
      );
    } else if (operation === 'edit') {
      console.log('Edit Equipment Data:', this.editEquipmentData); // Log the data being edited
      this.adminService.updateEquipment(this.editEquipmentData.equipmentId, this.editEquipmentData).subscribe(
        response => {
          this.responseMessage = 'Equipment updated successfully!';
          console.log('Response:', response); // Log the response from the API
        },
        error => {
          this.responseMessage = 'Error updating equipment.';
          console.log('Error:', error); // Log any error from the API
        }
      );
    } else if (operation === 'delete') {
      console.log('Delete Equipment ID:', this.deleteEquipmentData.equipmentId); // Log the ID being deleted
      this.adminService.deleteEquipment(this.deleteEquipmentData.equipmentId).subscribe(
        response => {
          this.responseMessage = 'Equipment deleted successfully!';
          console.log('Response:', response); // Log the response from the API
        },
        error => {
          this.responseMessage = 'Error deleting equipment.';
          console.log('Error:', error); // Log any error from the API
        }
      );
    }
  }
}
