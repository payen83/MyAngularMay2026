import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SharedModules } from '../../shared/shared.module';
import { MatTableDataSource } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { Api } from '../../services/api';
import { Ui } from '../../services/ui';

interface reportItem {
  title: string,
  category: string,
  date: string
}

@Component({
  selector: 'app-reports',
  imports: [...SharedModules, RouterLink],
  templateUrl: './reports.html',
  styleUrl: './reports.scss',
})
export class Reports implements OnInit {
  public reportList: reportItem[] = [
    { title: 'Sample report title 1', category: 'Sample category', date: '01/01/1978' }
  ];
  public dataSource: any = new MatTableDataSource(this.reportList);
  public displayedColumns: string[] = ['no', 'title', 'date', 'actions'];

  constructor(
    private router: Router,
    private apiServices: Api,
    private cdr: ChangeDetectorRef,
    private ui: Ui
  ) { }

  async ngOnInit() {
    try {
      let response: any = await this.apiServices.httpGet('/reports');
      console.log(response);
      this.reportList = response.data;
      this.dataSource = new MatTableDataSource(this.reportList);
      this.dataSource.data = this.dataSource.data.map((report: any) => ({ ...report }));
      this.cdr.detectChanges();
    } catch (error) {

    }
  }

  async onDelete(id: any) {
    let confirmation = confirm('Are you sure?');
    if (confirmation) {
      try {
        let response: any = await this.apiServices.httpDelete('/reports/delete/' + id);
        if (response.success) {
          this.ui.openSnackBar('Deleted', 'OK');
          let index = this.reportList.findIndex((item: any) => { return item.id == id });
          this.reportList.splice(index, 1);
          this.dataSource = new MatTableDataSource(this.reportList);
          this.dataSource.data = this.dataSource.data.map((report: any) => ({ ...report }));
          this.cdr.detectChanges();
        }
      } catch (error) {
        console.error(error)
      }

    }
  }
}
