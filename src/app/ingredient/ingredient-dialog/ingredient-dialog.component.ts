import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-ingredient-dialog',
  templateUrl: './ingredient-dialog.component.html',
  styleUrls: ['./ingredient-dialog.component.scss'],
})

export class IngredientDialogComponent implements OnInit {
  ingredientForm: FormGroup;
  labelPosition = 'before';

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<IngredientDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
                this.ingredientForm = fb.group(data);
  }

  ngOnInit() {
  }

  save() {
    this.dialogRef.close(this.ingredientForm.value);
  }

  onCancelClick() {
    this.dialogRef.close();
  }
}
