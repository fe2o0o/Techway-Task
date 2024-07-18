import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../interfaces/employee';
@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private _HttpClient:HttpClient) { }

  formMood:BehaviorSubject<string> = new BehaviorSubject<string>('add')
  selectedEmployee :BehaviorSubject<Employee|null> = new BehaviorSubject<Employee|null>(null)
  getAllEmployees(): Observable<any>{
    return this._HttpClient.get('https://task-dot-fe-task-428108.uc.r.appspot.com/employees')
  }


  deleteEmployee(id: any): Observable<any>{
    return this._HttpClient.delete(`https://task-dot-fe-task-428108.uc.r.appspot.com/employees/${id}`)
  }

  addEmployee(data: any): Observable<any>{
    return this._HttpClient.post('https://task-dot-fe-task-428108.uc.r.appspot.com/employees' , data)
  }


  updateEmployee(id: any, data: any):Observable<any> {
    return this._HttpClient.put(`https://task-dot-fe-task-428108.uc.r.appspot.com/employees/${id}`,data)
  }

  getSpacificEmployee(id: any): Observable<any>{
    return this._HttpClient.get(`https://task-dot-fe-task-428108.uc.r.appspot.com/employees/${id}`)
  }

}
