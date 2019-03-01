import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup} from "@angular/forms";
import { CdkDragDrop, moveItemInArray, transferArrayItem  } from '@angular/cdk/drag-drop';
import * as _  from 'lodash';

import { MealService } from '../../meal/meal.service'
import { MealSlotDialogComponent } from '../mealSlot-dialog/mealSlot-dialog.component';
import { Meal } from '../../meal/meal.model';

@Component({
  selector: 'app-day-dialog',
  templateUrl: './day-dialog.component.html',
  styleUrls: ['./day-dialog.component.scss'],
  providers: [
    MealService,
  ]
})

export class DayDialogComponent implements OnInit {
  dayForm: FormGroup
  labelPosition = 'before';
  masterMealList: any;
  editableMealList: any;
  mealCatalog: any;
  isDataAvailable = false;

  constructor(private fb: FormBuilder,
              private _mealService: MealService,
              public dialogRef: MatDialogRef<DayDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
                this.dayForm = fb.group(data);
  }

  ngOnInit() {
    this._mealService.list().subscribe(mealList => {
      this.mealCatalog = mealList;
      if (!this.data.mealSlots) {
        this.editableMealList = [];
      } else {
        this.editableMealList = this.clone(this.data.mealSlots);
        this.masterMealList = _.filter(this.mealCatalog, (meal) => !_.some(this.editableMealList, {'name': meal.name}));
      }
      this.isDataAvailable = true;
    });
  }

  dayListDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex,);
    }
  }

  masterListDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer !== event.container) {
      this.editableMealList.splice(event.previousIndex, 1);
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
    this.editableMealList.forEach(meal => {
      if (this.mealCatalog.some(masterMeal => masterMeal._id === meal._id)) {
        delete meal._id;
      }
    });
    this.dayForm.value.mealSlots = this.editableMealList;
    this.dialogRef.close(this.dayForm.value);
  }

  onCancelClick() {
    this.dialogRef.close();
  }
}
