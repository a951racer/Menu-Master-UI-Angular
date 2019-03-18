import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup} from "@angular/forms";
import { CdkDragDrop, moveItemInArray, copyArrayItem } from '@angular/cdk/drag-drop';
import { RecipeService } from '../../recipe/recipe.service'

@Component({
  selector: 'app-mealSlot-dialog',
  templateUrl: './mealSlot-dialog.component.html',
  styleUrls: ['./mealSlot-dialog.component.scss'],
  providers: [
    RecipeService,
  ]
})

export class MealSlotDialogComponent implements OnInit {
  mealSlotForm: FormGroup;
  labelPosition = 'before';
  masterRecipeList: [];
  editableRecipeList: any;
  isDataAvailable = false;

  constructor(private fb: FormBuilder,
              private _recipeService: RecipeService,
              public dialogRef: MatDialogRef<MealSlotDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
                this.mealSlotForm = fb.group(data);
  }

  ngOnInit() {
    this._recipeService.list().subscribe(recipeList => {

      this.masterRecipeList = recipeList;
      if (!this.data.recipes) {
        this.editableRecipeList = [];
      } else {
        this.editableRecipeList = this.clone(this.data.recipes);
      }
      this.isDataAvailable = true;
    });
  }

  mealSlotListDrop(event: CdkDragDrop<string[]>) {
    console.log('drop')
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      copyArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    this.editableRecipeList = event.container.data;
  }

  masterListDrop(event: CdkDragDrop<string[]>) {
    console.log('drop master')
    if (event.previousContainer !== event.container) {
      this.editableRecipeList.splice(event.previousIndex, 1);
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
    this.mealSlotForm.value.recipes = this.editableRecipeList;
    this.dialogRef.close(this.mealSlotForm.value);
  }

  onCancelClick() {

    this.dialogRef.close();
  }
}
