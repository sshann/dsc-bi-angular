import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {CompanyFormDialogComponent} from './company-form-dialog/company-form-dialog.component';
import {DeleteConfirmationComponent} from '../../shared/dialog/delete-confirmation/delete-confirmation.component';
import {Company} from '../../shared/Company';
import {CompanyService} from '../company.service';
import {UserFormDialogComponent} from '../../auth/user-form-dialog/user-form-dialog.component';

@Component({
  selector: 'app-company-data',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit, AfterViewInit {
  displayedColumns = ['name', 'responsibleName', 'responsibleEmail', 'responsiblePhone', 'actions'];
  dataSource = new MatTableDataSource();
  dataFetched = false;
  companys: Company[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private companyService: CompanyService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.companyService.getCompanyList().subscribe(response => {
        this.companys = response;
        this.dataSource.data = this.companys;
        this.dataFetched = true;
      });

    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openCreateDialog() {
    const createDialogRef = this.dialog.open(CompanyFormDialogComponent);
    createDialogRef
      .afterClosed()
      .subscribe(company => {
        if (company) {
          this.companys.push(company);
          this.dataSource.data = this.companys;
        }
      });
  }

  openUserCreateDialog($event, company) {
    event.stopPropagation();
    this.dialog.open(UserFormDialogComponent, {
      data: {
        company_id: company.id
      }
    });
  }

  openDeleteDialog(event, company) {
    event.stopPropagation();
    const deleteDialogRef = this.dialog.open(DeleteConfirmationComponent, {
      data: {
        modelId: company.id,
        modelName: 'company'
      }
    });

    deleteDialogRef.afterClosed().subscribe(confirmation => {
      if (confirmation) {
        this.companyService.deleteCompany(company).subscribe(response => {
          this.snackBar.open('Company deleted! ', null, {
            duration: 3000,
          });
          this.companys.splice(this.getCompanyIndex(company), 1);
          this.dataSource.data = this.companys;
        });
      }
    });
  }

  openEditDialog(event, company) {
    event.stopPropagation();
    const editDialogRef = this.dialog.open(CompanyFormDialogComponent, {
      data: {
        company: company
      }
    });
    editDialogRef
      .afterClosed()
      .subscribe(updatedCompany => {
        if (updatedCompany) {
          this.companys[this.getCompanyIndex(company)] = updatedCompany;
          this.dataSource.data = this.companys;
        }
      });

  }

  private getCompanyIndex(company) {
    return this.companys.findIndex(element => {
      return element.id === company.id;
    });
  }


}

