import { Component, Inject } from '@angular/core';
import { ConfirmationData } from './confirmation-data';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  public title: string;
  public prompt: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationData,
  ) {
    this.title = data.title;
    this.prompt = data.prompt;
  }

  public confirm(result: boolean): void {
    this.dialogRef.close(result);
  }
}
