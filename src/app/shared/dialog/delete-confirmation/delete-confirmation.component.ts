import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.css']
})
export class DeleteConfirmationComponent implements OnInit {
  modelId: string;
  modelName: string;

  constructor(private dialogRef: MatDialogRef<DeleteConfirmationComponent>,
              @Inject(MAT_DIALOG_DATA) private data) {
  }

  ngOnInit() {
    this.modelName = this.data.modelName;
    this.modelId = this.data.modelId;
  }

  confirmation() {
    this.dialogRef.close(true);
  }

}
