import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {EmployeeDataService} from './employee-data.service';
import {EmployeeData} from '../../shared/models/employee-data.model';
import {EmployeeFormDialogComponent} from './employee-form-dialog/employee-form-dialog.component';
import {DeleteConfirmationComponent} from '../../shared/dialog/delete-confirmation/delete-confirmation.component';

// Expandable row source conde found at
// https://stackblitz.com/edit/angular-material-expandable-table-rows?file=app%2Ftable%2Ftable.component.html
@Component({
  selector: 'app-employee-data',
  templateUrl: './employee-data.component.html',
  styleUrls: ['./employee-data.component.css']
})
export class EmployeeDataComponent implements OnInit, AfterViewInit {
  displayedColumns = ['date', 'category', 'name', 'current_stock', 'current_value', 'actions'];
  dataSource = new MatTableDataSource();
  dataFetched = false;
  employees: EmployeeData[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient,
              private employeeService: EmployeeDataService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.employeeService.list().subscribe(response => {
        this.employees = response;
        this.dataSource.data = this.employees;
        this.dataFetched = true;
      });

    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openCreateDialog() {
    const createDialogRef = this.dialog.open(EmployeeFormDialogComponent);
    createDialogRef
      .afterClosed()
      .subscribe(employee => {
        if (employee) {
          this.employees.push(employee);
          this.dataSource.data = this.employees;
        }
      });
  }

  openDeleteDialog(event, employee) {
    event.stopPropagation();
    const deleteDialogRef = this.dialog.open(DeleteConfirmationComponent, {
      data: {
        modelId: employee.id,
        modelName: 'employee'
      }
    });

    deleteDialogRef.afterClosed().subscribe(confirmation => {
      if (confirmation) {
        this.employeeService.delete(employee).subscribe(response => {
          this.snackBar.open('Employee deleted! ', null, {
            duration: 3000,
          });
          this.employees.splice(this.getEmployeeIndex(employee), 1);
          this.dataSource.data = this.employees;
        });
      }
    });
  }

  openEditDialog(event, employee) {
    event.stopPropagation();
    const editDialogRef = this.dialog.open(EmployeeFormDialogComponent, {
      data: {
        employee: employee
      }
    });
    editDialogRef
      .afterClosed()
      .subscribe(updatedEmployee => {
        if (updatedEmployee) {
          this.employees[this.getEmployeeIndex(employee)] = updatedEmployee;
          this.dataSource.data = this.employees;
        }
      });

  }

  private getEmployeeIndex(employee) {
    return this.employees.findIndex(element => {
      return element.id === employee.id;
    });
  }


}

