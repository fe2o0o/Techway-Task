import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeesService } from '../../services/employees.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon'
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../../interfaces/employee';
@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [RouterLink,MatIconModule,CurrencyPipe,MatTableModule, MatPaginatorModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent implements OnInit {
  constructor(private _ToastrService:ToastrService,private _Router:Router,private _EmployeesService:EmployeesService){}
  displayedColumns: string[] = ['name', 'position', 'department', 'salary' , 'controls'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  employees: any[] = [];

  ngOnInit(): void {
    this.fetchEmployeesData()
  }

  applyFilter(target: any , filterBy:string) {
    const filterValue = target.value.trim()
    const filterData = this.employees.filter((e) => {
      return e[filterBy].toLowerCase().includes(filterValue) && this.employees
    })

    this.dataSource.data = filterData

  }

  deleteEmployee(id: any) {
    this._EmployeesService.deleteEmployee(id).subscribe({
      next: (res) => {
        this.fetchEmployeesData()
        this._ToastrService.success("Employee Deleted" , "Success")
      },
      error: (err) => {
        this.fetchEmployeesData()
        this._ToastrService.success("Employee Deleted" , "Success")
      }
    })
  }

  fetchEmployeesData() {
      this._EmployeesService.getAllEmployees().subscribe({
      next: (res) => {
        this.employees = res;
        this.dataSource.data = res
      }
    })
  }


  updateEmployee(ele: any) {
    this._EmployeesService.formMood.next('update')
    this._EmployeesService.selectedEmployee.next(ele)
    this._Router.navigate(['employee-form'])
  }
}
