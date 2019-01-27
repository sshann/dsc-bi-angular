import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {TransactionDataService} from './transaction-data.service';
import {TransactionData} from '../../shared/models/transaction-data.model';
import {TransactionFormDialogComponent} from './transaction-form-dialog/transaction-form-dialog.component';

// Expandable row source conde found at
// https://stackblitz.com/edit/angular-material-expandable-table-rows?file=app%2Ftable%2Ftable.component.html
@Component({
  selector: 'app-transaction-data',
  templateUrl: './transaction-data.component.html',
  styleUrls: ['./transaction-data.component.css']
})
export class TransactionDataComponent implements OnInit, AfterViewInit {
  displayedColumns = ['date', 'type', 'value', 'amount', 'reference', 'actions'];
  dataSource = new MatTableDataSource();
  dataFetched = false;
  transactions: TransactionData[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient,
              private TDservice: TransactionDataService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.TDservice.list().subscribe(response => {
        this.transactions = response;
        this.dataSource.data = this.transactions;
        this.dataFetched = true;
      });

    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openCreateDialog() {
    const createDialogRef = this.dialog.open(TransactionFormDialogComponent);
    createDialogRef
      .afterClosed()
      .subscribe(transaction => {
        if (transaction) {
          this.transactions.push(transaction);
          this.dataSource.data = this.transactions;
        }
      });
  }

  openDeleteDialog(event, transaction, index) {
    event.stopPropagation();
    console.log('delete', transaction);
  }

  openEditDialog(event, transaction, index) {
    event.stopPropagation();
    const editDialogRef = this.dialog.open(TransactionFormDialogComponent, {
      data: {
        transaction: transaction
      }
    });
    editDialogRef
      .afterClosed()
      .subscribe(updatedTransaction => {
        if (updatedTransaction) {
          this.transactions[index] = updatedTransaction;
          this.dataSource.data = this.transactions;
        }
      });

  }


}

