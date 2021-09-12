import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-employee-dialog',
  templateUrl: './dialog-add-employee-dialog.component.html',
  styleUrls: ['./dialog-add-employee-dialog.component.scss']
})
export class DialogAddEmployeeComponentDialog implements OnInit {
  public form!: FormGroup

  constructor(
    public dialogRef: MatDialogRef<DialogAddEmployeeComponentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.form = this.data.form;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
