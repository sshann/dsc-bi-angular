import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {TransactionDataService} from './transaction-data.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

/* Expandable row source conde found at https://stackblitz.com/edit/angular-material-expandable-table-rows?file=app%2Ftable%2Ftable.component.html */
@Component({
  selector: 'app-transaction-data',
  templateUrl: './transaction-data.component.html',
  styleUrls: ['./transaction-data.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
      state('expanded', style({height: '*', visibility: 'visible'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TransactionDataComponent implements OnInit {
  displayedColumns = ['date', 'type', 'value', 'amount', 'reference', 'actions'];
  dataSource = new MatTableDataSource();
  expandedElement: any;

  isExpansionDetailRow = (i: number, row: any) => row.hasOwnProperty('detailRow');

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient,
              private TDservice: TransactionDataService) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.TDservice.list().subscribe(response => {
        const rows = [];
        response.forEach(element => rows.push(element, { detailRow: true, element }));
        this.dataSource.data = rows;
      });

    });
  }

}

