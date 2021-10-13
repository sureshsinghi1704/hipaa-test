import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
@Component({
  selector: 'app-add-edit-hipaa-data',
  templateUrl: './add-edit-hipaa-data.component.html',
  styleUrls: ['./add-edit-hipaa-data.component.scss']
})
export class AddEditHipaaDataComponent implements OnInit {
  @Input() public data: any;
  @Input() public isEdit: boolean;
  formGroup: FormGroup;
  dateFormat = 'MM/dd/yyyy';
  constructor(private fb: FormBuilder,
    private nzModalRef: NzModalRef) { }

  ngOnInit(): void {
    this.initForm(this.data);
  }

  initForm(data?: any) {
    this.formGroup = this.fb.group({
      hippaasigned: [data && data['hippaasigned'] || '', [Validators.required]],
      hippaexpires: [data && data['hippaexpires'] || '', [Validators.required]],
    })
  }

  close() {
    this.nzModalRef.close();
  }

  submit() {
    if (this.formGroup.valid) {
      this.nzModalRef.close(this.formGroup.value);
    }
  }
}
