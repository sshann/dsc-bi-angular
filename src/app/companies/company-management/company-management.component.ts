import {Component, OnInit} from '@angular/core';
import {CompanyService} from '../company.service';
import {Company} from '../../shared/Company';
import {ActivatedRoute} from '@angular/router';
import {CompanyFormDialogComponent} from '../company/company-form-dialog/company-form-dialog.component';
import {MatDialog, MatSnackBar} from '@angular/material';
import {UserService} from '../../auth/user.service';
import {DeleteConfirmationComponent} from '../../shared/dialog/delete-confirmation/delete-confirmation.component';
import {User} from '../../shared/models/User.model';
import {UserFormDialogComponent} from '../../auth/user-form-dialog/user-form-dialog.component';

@Component({
  selector: 'app-company-management',
  templateUrl: './company-management.component.html',
  styleUrls: ['./company-management.component.css']
})
export class CompanyManagementComponent implements OnInit {
  company: Company;
  companyDataFetched = false;

  constructor(private companyService: CompanyService,
              private userService: UserService,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    const filter = 'filter[include][clients]=company_id';
    setTimeout(() => {
      this.route.params.subscribe(params => {
        this.companyDataFetched = false;
        this.companyService.get(params['id'], filter).subscribe(company => {
          this.company = company;
          this.companyDataFetched = true;
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

  openCreateDialog() {
    const createDialogRef = this.dialog.open(UserFormDialogComponent, {
      data: {
        company_id: this.company.id
      }
    });
    createDialogRef
      .afterClosed()
      .subscribe(user => {
        if (user) {
          this.company.clients.push(user);
        }
      });
  }

  openDeleteDialog(user: User, index: number) {
    event.stopPropagation();
    const deleteDialogRef = this.dialog.open(DeleteConfirmationComponent, {
      data: {
        modelId: user.name + '(' + user.id + ')',
        modelName: 'company'
      }
    });

    deleteDialogRef.afterClosed().subscribe(confirmation => {
      if (confirmation) {
        this.userService.delete(user).subscribe(response => {
          this.snackBar.open('User deleted! ', null, {
            duration: 3000,
          });
          this.company.clients.splice(index, 1);
        });
      }
    });
  }

}
