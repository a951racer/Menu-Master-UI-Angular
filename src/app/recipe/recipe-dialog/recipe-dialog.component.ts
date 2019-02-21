import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup} from "@angular/forms";
import { CdkDragDrop, moveItemInArray, copyArrayItem } from '@angular/cdk/drag-drop';
import { IngredientService } from '../../ingredient/ingredient.service'

@Component({
  selector: 'app-recipe-dialog',
  templateUrl: './recipe-dialog.component.html',
  styleUrls: ['./recipe-dialog.component.scss'],
  providers: [
    IngredientService,
  ]
})

export class RecipeDialogComponent implements OnInit {
  recipeForm: FormGroup;
  labelPosition = 'before';
  masterIngredientList: [];
  editableIngredientList: any;
  isDataAvailable = false;

  constructor(private fb: FormBuilder,
              private _ingredientService: IngredientService,
              public dialogRef: MatDialogRef<RecipeDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
                this.recipeForm = fb.group(data);
  }

  ngOnInit() {
    this._ingredientService.list().subscribe(ingredientList => {

      this.masterIngredientList = ingredientList;
      if (!this.data.ingredients) {
        this.editableIngredientList = [];
      } else {
        this.editableIngredientList = this.clone(this.data.ingredients);
      }
      this.isDataAvailable = true;
    });
  }

  recipeListDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      copyArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    this.editableIngredientList = event.container.data;
  }

  masterListDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer !== event.container) {
      this.editableIngredientList.splice(event.previousIndex, 1);
    }
  }

  clone(list) {
    let newList = []
    list.forEach(listItem => {
      newList.push(listItem);
    });
    return newList;
  }

  save() {
    this.recipeForm.value.ingredients = this.editableIngredientList;
    this.dialogRef.close(this.recipeForm.value);
  }

  onCancelClick() {

    this.dialogRef.close();
  }
}
