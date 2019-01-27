import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {TransactionDataService} from './transaction-data.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {TransactionData} from '../../shared/models/transaction-data.model';

/* Expandable row source conde found at https://stackblitz.com/edit/angular-material-expandable-table-rows?file=app%2Ftable%2Ftable.component.html */
@Component({
  selector: 'app-transaction-data',
  templateUrl: './transaction-data.component.html',
  styleUrls: ['./transaction-data.component.css']
})
export class TransactionDataComponent implements OnInit, AfterViewInit {
  displayedColumns = ['date', 'type', 'value', 'amount', 'reference', 'actions'];
  dataSource = new MatTableDataSource();
  dataFetched = false;
  transactions: TransactionData[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private http: HttpClient,
              private TDservice: TransactionDataService) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.TDservice.list().subscribe(response => {
        this.transactions = response;
        this.dataSource.data = response;
        this.dataFetched = true;
      });

    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openCreateDialog() {
    console.log('create');
  }

  openDeleteDialog(event, transaction) {
    event.stopPropagation();
    console.log('delete', transaction);
  }

  openEditDialog(event, transaction) {
    event.stopPropagation();
    console.log('edit', transaction);
  }


}

