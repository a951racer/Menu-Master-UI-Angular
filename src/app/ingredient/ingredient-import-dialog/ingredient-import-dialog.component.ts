import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-ingredient-import-dialog',
  templateUrl: './ingredient-import-dialog.component.html',
  styleUrls: ['./ingredient-import-dialog.component.scss'],
})

export class IngredientImportDialogComponent implements OnInit {
  ingredientImportForm: FormGroup;
  labelPosition = 'before';

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<IngredientImportDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
                this.ingredientImportForm = fb.group(data);
  }

  ngOnInit() {
  }

  import() {
    this.dialogRef.close(this.ingredientImportForm.value);
  }

  onCancelClick() {
    this.dialogRef.close();
  }
}
