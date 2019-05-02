import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup} from "@angular/forms";
import { CdkDragDrop, moveItemInArray, copyArrayItem } from '@angular/cdk/drag-drop';
import { IngredientService } from '../../ingredient/ingredient.service'

@Component({
  selector: 'app-quantity-dialog',
  templateUrl: './quantity-dialog.component.html',
  styleUrls: ['./quantity-dialog.component.scss'],
  providers: [
    IngredientService,
  ]
})

export class QuantityDialogComponent implements OnInit {
  quantityForm: FormGroup;
  labelPosition = 'before';

  constructor(private fb: FormBuilder,
//              private _ingredientService: IngredientService,
              public dialogRef: MatDialogRef<QuantityDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
                this.quantityForm = fb.group(data);
  }

  ngOnInit() {

  }

  save() {
    this.dialogRef.close(this.quantityForm.value);
  }

  onCancelClick() {
    this.dialogRef.close();
  }
}
