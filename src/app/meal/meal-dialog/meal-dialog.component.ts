import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-meal-dialog',
  templateUrl: './meal-dialog.component.html',
  styleUrls: ['./meal-dialog.component.scss'],
})

export class MealDialogComponent implements OnInit {
  mealForm: FormGroup;
  labelPosition = 'before';

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<MealDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
                this.mealForm = fb.group(data);
  }
  
  ngOnInit() {
  }

  save() {
    this.dialogRef.close(this.mealForm.value);
  }

  onCancelClick() {
    this.dialogRef.close();
  }
}
