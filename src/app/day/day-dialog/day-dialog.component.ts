import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup} from "@angular/forms";
import { MealComponent } from '../../meal/meal.component';
import { MealService } from 'src/app/meal/meal.service';
import { ConstantPool } from '@angular/compiler';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-day-dialog',
  templateUrl: './day-dialog.component.html',
  styleUrls: ['./day-dialog.component.scss'],
  providers: [
    MealService,
  ]
})

export class DayDialogComponent implements OnInit {
  dayForm: FormGroup;
  labelPosition = 'before';
  meals: [];
  isDataAvailable = false;

  constructor(private fb: FormBuilder,
              private _mealService: MealService,
              public dialogRef: MatDialogRef<DayDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
                this.dayForm = fb.group(data);
  }
  
  ngOnInit() {
    this._mealService.list().subscribe(mealList => {

      this.meals = mealList;
      if (!this.data.mealList) {
        this.data.mealList = [{id: -1, name: 'Drag Meals Here'}];
      }
      this.isDataAvailable = true;
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    if (this.data.mealList.length > 1) {
      const placeHolderIndex = this.data.mealList.findIndex(function(a){return a.id === -1});
      console.log(this.data.mealList);
      console.log(placeHolderIndex);
      if (placeHolderIndex === 0) {
        this.data.mealList.slice(1);
      } else {
        this.data.mealList.slice(0, placeHolderIndex - 1) + this.data.mealList.slice(placeHolderIndex + 1)
      }
    }
  }

  save() {
    this.dialogRef.close(this.dayForm.value);
  }

  onCancelClick() {
    this.dialogRef.close();
  }
}
