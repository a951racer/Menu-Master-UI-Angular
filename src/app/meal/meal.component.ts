import { Component, OnInit } from '@angular/core';
import { MealService } from './meal.service';
import { MealDialogComponent } from './meal-dialog/meal-dialog.component'
import { MatTable, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { meal } from './meal.model';
import { ConfirmationDialogComponent } from '../helpers/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss'],
  providers: [ MealService ]
})

export class MealComponent implements OnInit {
  mealList: any;
  selectedMeal: any;
  showDetails = false;
  showEdit = false;
  displayedMealColumns = ['order','name'];
  dialogData: any;

  constructor(private _mealService: MealService,
              public dialog: MatDialog)
  { }

  ngOnInit() {
    this._mealService.list().subscribe(mealList  => {
      this.mealList = mealList;
      this.selectedMeal = {};
    });
  }

  onCardClick(id) {
    if (this.selectedMeal._id === id) {
      this.selectedMeal = {};
      this.showDetails = false;
    } else {
      this._mealService.readOne(id).subscribe(meal => {
        this.selectedMeal = meal;
        this.showDetails = true;
      });
    }
  }


  onDetailsClick() {
    this.selectedMeal = {};
    this.showDetails = false;
  }

  handleButtonClick(buttonName) {
    switch (buttonName) {
      case 'edit':
        this.editMeal(meal);
        break;
      case 'close':
        this.selectedMeal = {};
        this.showDetails = false;
        break;
      case 'delete':
        this.deleteMeal(this.selectedMeal);
        break;
    }
  }

  newMeal() {
    let newmeal = new meal();
    this.dialogData = newmeal;
    this.dialogData.dialogTitle = 'New meal';
    const dialogRef = this.dialog.open(MealDialogComponent, {
      width: '300px',
      height: 'auto',
      data: this.dialogData
    });

    dialogRef.afterClosed().subscribe(newMeal => {
      if (newMeal) {
        this._mealService.insert(newMeal).subscribe(meal => {
          this.selectedMeal = meal;
          this.showDetails = true;
        });
      }
    });
  }

  editMeal(meal) {
    this.dialogData = this.selectedMeal;
    this.dialogData.dialogTitle = 'Edit Meal';
    const dialogRef = this.dialog.open(MealDialogComponent, {
      width: '400px',
      height: 'auto',
      data: this.dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.id = this.selectedMeal.id;
        console.log(result);
        this._mealService.update(result).subscribe(meal => {
          this.selectedMeal = meal;
          this.showDetails = true;
        });
      }
    });
  }

  deleteMeal(meal) {
    this.dialogData = {};
    this.dialogData.dialogTitle = 'Delete meal';
    this.dialogData.dialogMessage = 'Delete this meal?';
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      height: 'auto',
      data: this.dialogData
    });

    dialogRef.afterClosed().subscribe(confirmation => {
      if (confirmation) {
        this._mealService.delete(meal).subscribe(response => {
          this.selectedMeal = {};
          this.showDetails = false;
        });
      }
    });
  }
}
