import {Component, OnInit} from '@angular/core';
import {CompanyService} from '../../companies/company.service';
import {CompanyReport} from '../../shared/models/report.model';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import {LoadingService} from '../../shared/loading.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  report: CompanyReport;
  dataFeched: boolean;
  isDownloading = false;

  constructor(private companyService: CompanyService,
              private loadingService: LoadingService) {
  }

  ngOnInit() {
    const companyId = JSON.parse(localStorage.getItem('currentUser')).company_id;
    setTimeout(() => {
      this.companyService.getReport(companyId).subscribe(response => {
        console.log(response);
        this.report = response;
        this.dataFeched = true;
      });
    }, 500);
  }

  downloadReport() {
    // this.loadingService.setStatus(true);
    this.isDownloading = true;
    const data = document.getElementById('dashboard');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      const imgWidth = 208;
      const imgHeight = 0.6 * canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png');
      const position = 0;
      const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('BI Report ' + new Date().toDateString() + '.pdf'); // Generated PDF
      // this.loadingService.setStatus(false);
      this.isDownloading = false;

    });
  }
}
