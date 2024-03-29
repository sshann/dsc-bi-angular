import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {ProductDataService} from './product-data.service';
import {ProductData} from '../../shared/models/product-data.model';
import {ProductFormDialogComponent} from './product-form-dialog/product-form-dialog.component';
import {DeleteConfirmationComponent} from '../../shared/dialog/delete-confirmation/delete-confirmation.component';
import {ImportDialogComponent} from '../import/import-dialog.component';
import {ExportDialogComponent} from '../export/export-dialog.component';

@Component({
  selector: 'app-product-data',
  templateUrl: './product-data.component.html',
  styleUrls: ['./product-data.component.css']
})
export class ProductDataComponent implements OnInit, AfterViewInit {
  displayedColumns = ['date', 'category', 'name', 'current_stock', 'current_value', 'reference', 'actions'];
  dataSource = new MatTableDataSource();
  dataFetched = false;
  products: ProductData[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient,
              private productService: ProductDataService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.productService.list().subscribe(response => {
        this.products = response;
        this.dataSource.data = this.products;
        this.dataFetched = true;
      });

    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openCreateDialog() {
    const createDialogRef = this.dialog.open(ProductFormDialogComponent);
    createDialogRef
      .afterClosed()
      .subscribe(product => {
        if (product) {
          this.products.push(product);
          this.dataSource.data = this.products;
        }
      });
  }

  openDeleteDialog(event, product) {
    event.stopPropagation();
    const deleteDialogRef = this.dialog.open(DeleteConfirmationComponent, {
      data: {
        modelId: product.id,
        modelName: 'product'
      }
    });

    deleteDialogRef.afterClosed().subscribe(confirmation => {
      if (confirmation) {
        this.productService.delete(product).subscribe(response => {
          this.snackBar.open('Product deleted! ', null, {
            duration: 3000,
          });
          this.products.splice(this.getProductIndex(product), 1);
          this.dataSource.data = this.products;
        });
      }
    });
  }

  openEditDialog(event, product) {
    event.stopPropagation();
    const editDialogRef = this.dialog.open(ProductFormDialogComponent, {
      data: {
        product: product
      }
    });
    editDialogRef
      .afterClosed()
      .subscribe(updatedProduct => {
        if (updatedProduct) {
          this.products[this.getProductIndex(product)] = updatedProduct;
          this.dataSource.data = this.products;
        }
      });
  }

  openImportDialog(event) {
    event.stopPropagation();
    this.dialog.open(ImportDialogComponent, {
      data: {
        type: 'ProductData'
      }
    });
  }

  openExportDialog(event) {
    event.stopPropagation();
    this.dialog.open(ExportDialogComponent, {
      data: {
        type: 'ProductData'
      }
    });
  }

  private getProductIndex(product) {
    return this.products.findIndex(element => {
      return element.id === product.id;
    });
  }


}

