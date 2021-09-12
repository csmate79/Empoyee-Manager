import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddEmployeeComponentDialog } from './dialogs/dialog-add-employee/dialog-add-employee-dialog.component';
import { DialogEditEmployeeComponentDialog } from './dialogs/dialog-edit-employee/dialog-edit-employee-dialog.component';
import { DialogRemoveEmployeeComponentDialog } from './dialogs/dialog-remove-employee/dialog-remove-employee-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public employees!: Employee[];
  private updateForm!: FormGroup;
  private form!: FormGroup;

  constructor(
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.getEmployees();
    this.initForm();
    this.initUpdateForm();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
        console.log(this.employees);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddClick(): void {
    this.initForm();
    const dialogRef = this.dialog.open(DialogAddEmployeeComponentDialog, {
      width: '250px',
      data: {
        form: this.form
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.employeeService.addEmployee(result).subscribe(
        (response: Employee) => {
          console.log(response);
          this.getEmployees();
        },
        (error: HttpErrorResponse) => {
          alert(error.message)
        }
      )
    });
  }

  public onEditClick(employee: any) {
    this.initUpdateForm();
    this.setUpdateFormValue(employee);

    const dialogRef = this.dialog.open(DialogEditEmployeeComponentDialog, {
      width: '250px',
      data: {
        form: this.updateForm
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.employeeService.updateEmployee(result).subscribe(
        (response: Employee) => {
          console.log(response);
          this.getEmployees();
        },
        (error: HttpErrorResponse) => {
          alert(error.message)
        }
      )
    });
  }

  public onRemoveClick(employeeId: number) {
    const dialogRef = this.dialog.open(DialogRemoveEmployeeComponentDialog, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(employeeId);
        this.employeeService.deleteEmployee(employeeId).subscribe(
          (response: void) => {
            console.log(response);
            this.getEmployees();
          },
          (error: HttpErrorResponse) => {
            console.log(error.message);
          }
        );
      }
      console.log('The dialog was closed');
    });
  }

  public searchEmployees(key: string): void {
    const results: Employee[] = [];

    for (const employee of this.employees) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.employees = results;
    if (results.length === 0 || !key) {
      this.getEmployees();
    }
  }

  public initForm() {
    this.form = this.formBuilder.group({
      name: [''],
      jobTitle: [''],
      phone: [''],
      email: [''],
      imageUrl: [''],
    });
  }

  public initUpdateForm() {
    this.updateForm = this.formBuilder.group({
      id: {value: null, disabled: true},
      name: [''],
      jobTitle: [''],
      phone: [''],
      email: [''],
      imageUrl: [''],
      employeeCode: [''],
    });
  }

  public setUpdateFormValue(employee: Employee) {
    this.updateForm.setValue({
      'id': employee.id,
      'name': employee.name,
      'email': employee.email,
      'jobTitle': employee.jobTitle,
      'phone': employee.phone,
      'imageUrl': employee.imageUrl,
      'employeeCode': employee.employeeCode,
    })
  }
}
