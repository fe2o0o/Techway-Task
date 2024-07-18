import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeesService } from '../../services/employees.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent implements OnInit, OnDestroy {
  constructor(private _ToastrService: ToastrService, private _EmployeesService: EmployeesService) {
    this._EmployeesService.formMood.subscribe({
      next: () => {
        if (this._EmployeesService.formMood.getValue() == 'add') {
          this.mood.set('add')
        } else {
          this.mood.set('update')
        }
      }
    })
  }

  mood = signal('add')
  updatedEmplyee: any;
  employeeForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(15)]),
    position: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(15)]),
    department: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(15)]),
    salary: new FormControl(null, [Validators.required, Validators.min(100)])
  })

  ngOnInit(): void {
    if (this.mood() == 'update') {
      this._EmployeesService.selectedEmployee.subscribe({
        next: (res) => {
          this.updatedEmplyee = res
          this.handleFormForUpdate()
        }
      })
    }
  }

  handleSubmit(form: FormGroup) {
    if (form.valid) {
      if (this.mood() == 'add') {
        this._EmployeesService.addEmployee(form.value).subscribe({
          next: (res) => {
            this.employeeForm.reset();
            this._ToastrService.success('Employee Added' , 'Success')
          }
        })
      } else {
        this._EmployeesService.updateEmployee(this.updatedEmplyee._id, form.value).subscribe({
          next: (res) => {
            this.employeeForm.reset();
            this._ToastrService.success('Employee UpDated', 'Success')
            this._EmployeesService.formMood.next('add')
            this._EmployeesService.selectedEmployee.next(null)
            this.mood.set('add')
          }
        })
      }
    }
  }

  ngOnDestroy(): void {
    if (this.mood() !== 'add') {
      this._EmployeesService.formMood.next('add')
    }
  }


  handleFormForUpdate() {
    this.employeeForm.setValue({ name: this.updatedEmplyee.name, position: this.updatedEmplyee.position, department: this.updatedEmplyee.department, salary: this.updatedEmplyee.salary })
  }

}
