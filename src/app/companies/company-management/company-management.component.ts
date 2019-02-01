import {Component, OnInit} from '@angular/core';
import {CompanyService} from '../company.service';
import {Company} from '../../shared/Company';
import {ActivatedRoute} from '@angular/router';
import {CompanyFormDialogComponent} from '../company/company-form-dialog/company-form-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-company-management',
  templateUrl: './company-management.component.html',
  styleUrls: ['./company-management.component.css']
})
export class CompanyManagementComponent implements OnInit {
  company: Company;
  dataFetched = false;

  constructor(private companyService: CompanyService,
              private route: ActivatedRoute,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.route.params.subscribe(params => {
        this.dataFetched = false;
        this.companyService.get(params['id']).subscribe(company => {
          this.company = company;
          this.dataFetched = true;
        });
      });
    });
  }

  openEditDialog() {
    const editDialogRef = this.dialog.open(CompanyFormDialogComponent, {
      data: {
        company: this.company
      }
    });
    editDialogRef
      .afterClosed()
      .subscribe(updatedCompany => {
        if (updatedCompany) {
          this.company = updatedCompany;
        }
      });

  }

}
