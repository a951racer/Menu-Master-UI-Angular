import { Component, OnInit, ViewChild } from '@angular/core';
import { DayService } from './day.service';
import { MealService } from '../meal/meal.service';
import { MatTable, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { day } from './day.model';
import { meal } from '../meal/meal.model';
//import { MealDialogComponent } from '../meal/meal-dialog/meal-dialog.component';
import { DayDialogComponent } from './day-dialog/day-dialog.component';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { ConfirmationDialogComponent } from '../helpers/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['day.component.scss'],
  providers: [
    DayService,
  ]
})

export class DayComponent implements OnInit {

  dayList: any;
  selectedDay: any;
  showDetails = false;
  showEdit = false;
  displayedMealColumns = ['dateAdded','note'];
  dialogData: any;

  @ViewChild('mealTable') mealTable: MatTable<any>;

  constructor(private _dayService: DayService,
              //private _mealService: MealService,
              public dialog: MatDialog)
  { }

  ngOnInit() {
    this._dayService.list().subscribe(dayList  => this.dayList = dayList);
    this.selectedDay = {};
  }

  onCardClick(id) {
    if (this.selectedDay.id === id) {
      this.selectedDay = {};
      this.showDetails = false;
    } else {
      this._dayService.readOne(id).subscribe(day => {
        this.selectedDay = day;
        this.showDetails = true;
      });
    }
  }

  onDetailsClick() {
    this.selectedDay = {};
    this.showDetails = false;
  }

  handleButtonClick(buttonName) {
    switch (buttonName) {
      case 'edit':
        this.editDay(day);
        break;
      case 'close':
        this.selectedDay = {};
        this.showDetails = false;
        break;
      case 'delete':
        this.deleteDay(this.selectedDay);
        break;
    }
  }

  newDay() {
    let newDay = new day();
    this.dialogData = newDay;
    this.dialogData.dialogTitle = 'New Day';
    const dialogRef = this.dialog.open(DayDialogComponent, {
      width: '300px',
      height: 'auto',
      data: this.dialogData
    });

    dialogRef.afterClosed().subscribe(newScotch => {
      if (newScotch) {
        this._dayService.insert(newScotch).subscribe(scotch => {
          this.selectedDay = scotch;
          this.showDetails = true;
        });
      }
    });
  }

  editDay(day) {
    this.dialogData = this.selectedDay;
    this.dialogData.dialogTitle = 'Edit Day';
    const dialogRef = this.dialog.open(DayDialogComponent, {
      width: 'auto',
      height: 'auto',
      data: this.dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        result.id = this.selectedDay.id;
        this._dayService.update(result).subscribe(day => {
          this.selectedDay = day;
          this.showDetails = true;
        });
      }
    });
  }

  deleteDay(day) {
    this.dialogData = {};
    this.dialogData.dialogTitle = 'Delete Day';
    this.dialogData.dialogMessage = 'Delete this day?';
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      height: 'auto',
      data: this.dialogData
    });

    dialogRef.afterClosed().subscribe(confirmation => {
      if (confirmation) {
        this._dayService.delete(day).subscribe(response => {
          this.selectedDay = {};
          this.showDetails = false;
        });
      }
    });
  }

  /*
  newMeal(id) {
    let newMeal = new meal();
    this.dialogData = newMeal;
    this.dialogData.dialogTitle = 'New Meal';
    const dialogRef = this.dialog.open(MealDialogComponent, {
      width: '300px',
      height: 'auto',
      data: this.dialogData
    });

    dialogRef.afterClosed().subscribe(newMeal => {
      this._dayService.addMeal(this.selectedDay, newMeal).subscribe(meal => {
        this.selectedDay.mealList.push(meal);
        this.mealTable.renderRows();
      });
    });
  }

  editMeal(meal) {
    this.dialogData = meal;
    this.dialogData.dialogTitle = 'Edit Meal';
    const dialogRef = this.dialog.open(MealDialogComponent, {
      width: '300px',
      height: 'auto',
      data: this.dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.id = meal.id;
        this._mealService.updateMeal(result).subscribe(updatedMeal => {
          this.selectedDay.mealList.pop(meal);
          this.selectedDay.mealList.push(updatedMeal)
          this.mealTable.renderRows();
        });
      }
    });
  }

  deleteMeal(meal) {
    this.dialogData = {};
    this.dialogData.dialogTitle = 'Delete Meal';
    this.dialogData.dialogMessage = 'Delete this meal?';
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      height: 'auto',
      data: this.dialogData
    });

    dialogRef.afterClosed().subscribe(confirmation => {
      if (confirmation) {
        this._mealService.deleteMeal(meal).subscribe(response => {
          this.selectedDay.tastingList.pop(meal);
          this.mealTable.renderRows();
        });
      }
    });
  }
  */
}
