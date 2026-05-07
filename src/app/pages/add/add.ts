import { Component, OnInit } from '@angular/core';
import { SharedModules } from '../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Api } from '../../services/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Ui } from '../../services/ui';

@Component({
  selector: 'app-add',
  imports: [...SharedModules],
  templateUrl: './add.html',
  styleUrl: './add.scss',
})
export class Add implements OnInit {
   public reportForm: FormGroup;
   public id: any;
   public selectedFile: File | null = null;
   constructor(
     public formBuilder: FormBuilder,
     public apiService: Api,
     public router: Router,
     public activatedRoute: ActivatedRoute,
     public uiServices: Ui
   ){
     this.reportForm = this.formBuilder.group({
       title: ['', Validators.required],
       date: ['', Validators.required],
       category: ['', Validators.required],
     })
   }

  async ngOnInit(){
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if(this.id){
      try{
        let response: any = await this.apiService.httpGet('/reports/'+this.id);
        if(response.success){
          let report = response.data;
          this.reportForm.setValue({
            title: report.title,
            category: report.category,
            date: this.parseApiDate(report.date)
          })
        }
      } catch(error){
        console.error(error);
      }
    }
  }

   private parseApiDate(value: string | Date | null): Date | null {
     if (!value) {
       return null;
     }
     if (value instanceof Date) {
       return value;
     }
     if (typeof value !== 'string') {
       return null;
     }

     // Try ISO format first
     const isoDate = new Date(value);
     if (!isNaN(isoDate.getTime())) {
       return isoDate;
     }

     // Support dd/mm/yyyy or dd-mm-yyyy from the API
     const dmy = /^([0-3]\d)[\/\-]([0-1]\d)[\/\-](\d{4})$/.exec(value);
     if (dmy) {
       const day = Number(dmy[1]);
       const month = Number(dmy[2]) - 1;
       const year = Number(dmy[3]);
       return new Date(year, month, day);
     }

     return null;
   }

   private formatDateToString(value: Date | string | null): string | null {
     if (!value) {
       return null;
     }
     const date = value instanceof Date ? value : new Date(value);
     if (isNaN(date.getTime())) {
       return null;
     }
     const day = `${date.getDate()}`.padStart(2, '0');
     const month = `${date.getMonth() + 1}`.padStart(2, '0');
     const year = date.getFullYear();
     return `${day}/${month}/${year}`;
   }

   onFileSelected(event: any) {
     const file: File = event.target.files[0];
     if (file) {
       this.selectedFile = file;
     }
   }

   async onSubmit(){
     if(this.reportForm.invalid){

     }

     try {
       const rawData: any = this.reportForm.value;
       let reportData: any = {
         ...rawData,
         date: this.formatDateToString(rawData.date) ?? rawData.date
       }
       
       // Create FormData for file upload
       const formData = new FormData();
       formData.append('title', reportData.title);
       formData.append('date', reportData.date);
       formData.append('category', reportData.category);
       
       // Append file if selected
       if (this.selectedFile) {
         formData.append('image', this.selectedFile, this.selectedFile.name);
       }
       
       let message: string = 'Report submitted successfully';
       let response: any;
       if(this.id){
         response = await this.apiService.httpPost('/reports/update/'+this.id, formData, 'put');
         message = 'Report updated successfully'
       } else {
         response = await this.apiService.httpPost('/reports/add', formData);
       }

       if(response){
         this.uiServices.openSnackBar(message, 'OK');
       }

       this.router.navigateByUrl('/reports');
     } catch(error){
       console.log(error);
     }
   }
}
