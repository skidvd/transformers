import { Component, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Transformer} from '../models/transformer';
import * as uuid from 'uuid';

@Component({
  selector: 'app-edit-participant-dialog',
  templateUrl: './edit-participant-dialog.component.html',
  styleUrls: ['./edit-participant-dialog.component.scss'],
})
export class EditParticipantDialogComponent {
  public title: string;
  public prompt: string;
  public form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditParticipantDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Transformer,
  ) {
    this.title = data.id ? 'Edit Transformer' : 'Add Transformer';
    if (!data.id) {
      data.id = uuid.v4();
    }
    this.prompt = `Please specify the details for the Transformer below.`;

    this.form = this.fb.group({
      name: [data.name, [Validators.required]],
      strength: [data.strength || 1, [Validators.required, Validators.min(1), Validators.max(10)]],
      intelligence: [data.intelligence || 1, [Validators.required, Validators.min(1), Validators.max(10)]],
      speed: [data.speed || 1, [Validators.required, Validators.min(1), Validators.max(10)]],
      endurance: [data.endurance || 1, [Validators.required, Validators.min(1), Validators.max(10)]],
      rank: [data.rank || 1, [Validators.required, Validators.min(1), Validators.max(10)]],
      courage: [data.courage || 1, [Validators.required, Validators.min(1), Validators.max(10)]],
      firepower: [data.firepower || 1, [Validators.required, Validators.min(1), Validators.max(10)]],
      skill: [data.skill || 1, [Validators.required, Validators.min(1), Validators.max(10)]],
    });
  }

  public confirm(result: boolean): void {
    if (!result) {
      this.dialogRef.close(false);
      return;
    }
    if (this.form.valid) {
      const updatedTransformer = {
        id: this.data.id,
        name: this.form.get('name').value,
        band: this.data.band,
        strength: this.form.get('strength').value,
        intelligence: this.form.get('intelligence').value,
        speed: this.form.get('speed').value,
        endurance: this.form.get('endurance').value,
        rank: this.form.get('rank').value,
        courage: this.form.get('courage').value,
        firepower: this.form.get('firepower').value,
        skill: this.form.get('skill').value
      } as Transformer;
      this.dialogRef.close(updatedTransformer);
      return;
    }
    this.dialogRef.close(false);
  }
}
