import { AddEditHipaaDataComponent } from './../../shared/add-edit-hipaa-data/add-edit-hipaa-data.component';
import { ViewAttachmentComponent } from './../../shared/view-attachment/view-attachment.component';
import { HippService } from './../../service/hipp.service';
import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-hipaa-grid',
  templateUrl: './hipaa-grid.component.html',
  styleUrls: ['./hipaa-grid.component.scss']
})
export class HippaGridComponent implements OnInit {

  cols = [
    { field: 'status', headerName: "STATUS", flex: 1, resizable: true },
    { field: 'hippaasigned', headerName: "HIPPA SIGNED", cellRenderer: 'date', flex: 1, resizable: true },
    { field: 'hippaexpires', headerName: "HIPPA EXPRIES", cellRenderer: 'date', flex: 1, resizable: true },
    {
      field: 'viewButtons', headerName: 'ATTACH/VIEW', cellRenderer: 'buttons', cellRendererParams: {
        viewButtons: [
          { icon: 'file', onCLick: this.onAttach.bind(this), label: 'Attach' },
          { icon: 'eye', onCLick: this.onView.bind(this), label: 'View' },
        ]
      }
    },
    {
      field: 'actionButtons', headerName: 'EDIT/DELETE', cellRenderer: 'buttons', cellRendererParams: {
        actionButtons: [
          { icon: 'edit', onCLick: this.onAddEdit.bind(this), label: 'Edit' },
          { icon: 'close', onCLick: this.onDelete.bind(this), label: 'Delete' },
        ]
      }
    },
  ]

  rowData: any = [];

  constructor(private hippService: HippService, private modal: NzModalService) { }

  ngOnInit(): void {
    this.hippService.data$.subscribe((data: any) => {
      this.rowData = [...data]
    });
    this.hippService.getGridData();
  }

  onView(data: any) {
    const modal = this.modal.create({
      nzTitle: 'View HIPPA Consent Attachment',
      nzContent: ViewAttachmentComponent,
      nzFooter: null,
      nzComponentParams: { url: data.pdf },
      // To send particular insurance info
    });
  }

  onAttach(data: any) {
    const modal = this.modal.create({
      nzTitle: 'View HIPPA Consent Attachment',
      nzContent: ViewAttachmentComponent,
      nzFooter: null,
      nzComponentParams: { url: data.pdf },
      // To send particular insurance info
    });
  }

  onAddEdit(data?: any) {
    const modal = this.modal.create({
      nzTitle: 'Edit HIPPA Consent',
      nzContent: AddEditHipaaDataComponent,
      nzFooter: null,
      nzMaskClosable: false,
      nzComponentParams: { data: data && data.data, isEdit: !!data },
      // To send particular insurance info
    });

    modal.afterClose.pipe(filter((value) => value)).subscribe((value) => {
      if (data) {
        this.hippService.updateData(data.rowIndex, value);
      } else {
        this.hippService.insertData(value);
      }
    });
  }

  onDelete(data: any) {
    this.modal.confirm({
      nzTitle: 'Do you Want to delete these items?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.hippService.deleteData(data.id),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    })
  }

}
