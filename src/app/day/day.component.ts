import { Component, OnInit, ViewChild } from '@angular/core';
import { DayService } from './day.service';
import { MealSlotService } from '../mealSlot/mealSlot.service';
import { MatTable, MatDialog, MatDivider, MAT_DIALOG_DATA} from '@angular/material';
import { Day } from './day.model';
import { Meal } from '../meal/meal.model';
import { MealSlotDialogComponent } from './mealSlot-dialog/mealSlot-dialog.component';
import { DayDialogComponent } from './day-dialog/day-dialog.component';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { ConfirmationDialogComponent } from '../helpers/confirmation-dialog/confirmation-dialog.component';
//import * as moment from 'moment';

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
  dialogData: any;

  @ViewChild('mealTable') mealTable: MatTable<any>;

  constructor(private _dayService: DayService,
              private _mealSlotService: MealSlotService,
              public dialog: MatDialog,)
  { }

  ngOnInit() {
    this._dayService.list().subscribe(dayList  => {
      this.dayList = dayList;
      this.selectedDay = {};
    })
  }

  onCardClick(id) {
    if (this.selectedDay._id === id) {
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
        this.editDay(this.selectedDay);
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
    let newDay = new Day();
    this.dialogData = newDay;
    this.dialogData.dialogTitle = 'New Day';
    const dialogRef = this.dialog.open(DayDialogComponent, {
      width: '700px',
      height: 'auto',
      data: this.dialogData
    });

    dialogRef.afterClosed().subscribe(newDay => {
      if (newDay) {
        this._dayService.insert(newDay).subscribe(day => {
          this.selectedDay = day;
          const newDayList = [...this.dayList];
          newDayList.push(day);
          this.dayList = newDayList;
          this.showDetails = true;
        });
      }
    });
  }

  editDay(day) {
    let selectedIndex = this.dayList.findIndex((d) => d._id === day._id);
    this.dialogData = this.selectedDay;
    this.dialogData.dialogTitle = 'Edit Day';
    const dialogRef = this.dialog.open(DayDialogComponent, {
      width: '700px',
      height: 'auto',
      data: this.dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.id = this.selectedDay._id;
        this._dayService.update(result).subscribe(day => {
          this.selectedDay = day;
          const newDayList = [...this.dayList];
          newDayList[selectedIndex] = day;
          this.dayList = newDayList;
          this.showDetails = true;
        });
      }
    });
  }

  deleteDay(day) {
    this.dialogData = {};
    this.dialogData.dialogTitle = 'Delete Day';
    //this.dialogData.dialogMessage = `Delete ${moment(day.date).format('dddd')}, ${moment(day.date).format('L')}?`;
    this.dialogData.dialogMessage = `Delete ?`
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

  editMeal(meal) {
    let selectedIndex = this.selectedDay.mealSlots.findIndex((ms) => ms._id === meal._id);
    this.dialogData = meal;
    //this.dialogData.dialogTitle = `Edit ${meal.name} for ${moment(this.selectedDay.date).format('dddd')}`;
    this.dialogData.dialogTitle = `Edit This`
    const dialogRef = this.dialog.open(MealSlotDialogComponent, {
      width: '700px',
      height: 'auto',
      data: this.dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.id = meal._id;
        this._mealSlotService.update(result).subscribe(meal => {
          const newMealList = [...this.selectedDay.mealSlots];
          newMealList[selectedIndex] = meal;
          this.selectedDay.mealSlots = newMealList;
          this.showDetails = true;
        });
      }
    });
  }
}
