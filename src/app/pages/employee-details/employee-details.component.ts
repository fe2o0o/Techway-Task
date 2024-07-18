import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeesService } from '../../services/employees.service';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent implements OnInit {
  constructor( private _EmployeesService:EmployeesService, private _ActivatedRoute: ActivatedRoute) {
    this._ActivatedRoute.params.subscribe({
      next: (res) => {
        this.employeeId.set(res['id'])
      }
    })
  }

  ngOnInit(): void {
    this._EmployeesService.getSpacificEmployee(this.employeeId()).subscribe({
      next: (res) => {
        this.employeeData.set(res)
      }
    })
  }

  employeeData = signal<any>(null)
  employeeId = signal(null)
}
