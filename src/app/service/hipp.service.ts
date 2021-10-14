import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import mockData from '../../assets/data.json';

@Injectable({
  providedIn: 'root'
})
export class HippService {

  data$ = new Subject();
  data = mockData.data;

  constructor() { }

  getGridData() {
    this.data$.next(this.data)
  }

  deleteData(id: number) {
    this.data.splice(id, 1);
    this.getGridData();
  }

  updateData(id: number, value: any) {
    this.data[id] = { id: id, ...value, pdf: './assets/display-pdf.pdf', status: 'Active' };
    this.getGridData();
  }

  insertData(value: any) {
    this.data.push({ id: this.data.length, ...value, pdf: './assets/display-pdf.pdf', status: 'Active' });
    this.getGridData();
  }
}
