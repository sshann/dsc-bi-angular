import {Component, OnInit} from '@angular/core';
import {CompanyService} from '../company.service';
import {Company} from '../../shared/Company';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-company-management',
  templateUrl: './company-management.component.html',
  styleUrls: ['./company-management.component.css']
})
export class CompanyManagementComponent implements OnInit {
  company: Company;
  dataFetched = false;

  constructor(private companyService: CompanyService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.dataFetched = false;
      this.companyService.get(params['id']).subscribe(company => {
        this.company = company;
        this.dataFetched = true;
      });
    });

  }

}
