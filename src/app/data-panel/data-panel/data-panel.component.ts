import {Component, OnInit} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ImportDialogComponent} from '../import/import-dialog.component';
import {ExportDialogComponent} from '../export/export-dialog.component';

@Component({
  selector: 'app-data-panel',
  templateUrl: './data-panel.component.html',
  styleUrls: ['./data-panel.component.css']
})
export class DataPanelComponent implements OnInit {

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  openImportDialog() {
    this.dialog.open(ImportDialogComponent);
  }

  openExportDialog() {
    this.dialog.open(ExportDialogComponent);
  }

}
