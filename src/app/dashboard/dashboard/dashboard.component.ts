import {Component, OnInit} from '@angular/core';
import {CompanyService} from '../../companies/company.service';
import {CompanyReport} from '../../shared/models/report.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  report: CompanyReport;
  dataFeched: boolean;

  constructor(private companyService: CompanyService) {
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

}
