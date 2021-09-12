import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from 'src/app/employee';

@Component({
  selector: 'app-dialog-edit-employee-dialog',
  templateUrl: './dialog-edit-employee-dialog.component.html',
  styleUrls: ['./dialog-edit-employee-dialog.component.scss']
})
export class DialogEditEmployeeComponentDialog implements OnInit {
  updateForm!: FormGroup

  constructor(
    public dialogRef: MatDialogRef<DialogEditEmployeeComponentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.updateForm = this.data.form;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
