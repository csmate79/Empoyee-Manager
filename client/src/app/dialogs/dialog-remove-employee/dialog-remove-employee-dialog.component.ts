import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-remove-employee-dialog',
  templateUrl: './dialog-remove-employee-dialog.component.html',
  styleUrls: ['./dialog-remove-employee-dialog.component.scss']
})
export class DialogRemoveEmployeeComponentDialog implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogRemoveEmployeeComponentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
