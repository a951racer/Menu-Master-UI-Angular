import { Component, OnInit } from '@angular/core';
import { IngredientService } from './ingredient.service';
import { MatDivider, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Ingredient } from './ingredient.model';
import { IngredientDialogComponent } from './ingredient-dialog/ingredient-dialog.component'
import { IngredientImportDialogComponent } from './ingredient-import-dialog/ingredient-import-dialog.component'
import { ConfirmationDialogComponent } from '../helpers/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.scss'],
  providers: [ IngredientService ]
})

export class IngredientComponent implements OnInit {
  ingredientList: any;
  selectedIngredient: any;
  showDetails = false;
  showEdit = false;
  displayedIngredientColumns = ['name','description'];
  dialogData: any;

  constructor(private _ingredientService: IngredientService,
              public dialog: MatDialog)
  { }

  ngOnInit() {
    this._ingredientService.list().subscribe(ingredientList  => {
      this.ingredientList = ingredientList;
      this.selectedIngredient = {};
    });
  }

  onCardClick(id) {
    if (this.selectedIngredient._id === id) {
      this.selectedIngredient = {};
      this.showDetails = false;
    } else {
      this._ingredientService.readOne(id).subscribe(ingredient => {
        this.selectedIngredient = ingredient;
        this.showDetails = true;
      });
    }
  }


  onDetailsClick() {
    this.selectedIngredient = {};
    this.showDetails = false;
  }

  handleButtonClick(buttonName) {
    switch (buttonName) {
      case 'edit':
        this.editIngredient(this.selectedIngredient);
        break;
      case 'close':
        this.selectedIngredient = {};
        this.showDetails = false;
        break;
      case 'delete':
        this.deleteIngredient(this.selectedIngredient);
        break;
    }
  }

  newIngredient() {
    let newingredient = new Ingredient(null);
    this.dialogData = newingredient;
    this.dialogData.dialogTitle = 'New ingredient';
    const dialogRef = this.dialog.open(IngredientDialogComponent, {
      width: '300px',
      height: 'auto',
      data: this.dialogData
    });

    dialogRef.afterClosed().subscribe(newIngredient => {
      if (newIngredient) {
        this._ingredientService.insert(newIngredient).subscribe(ingredient => {
          this.selectedIngredient = ingredient;
          this.showDetails = true;
        });
      }
    });
  }

  editIngredient(ingredient) {
    let index = this.ingredientList.findIndex((i) => i._id === ingredient._id);
    this.dialogData = new Ingredient(ingredient);
    this.dialogData.dialogTitle = 'Edit Ingredient';
    const dialogRef = this.dialog.open(IngredientDialogComponent, {
      width: '400px',
      height: 'auto',
      data: this.dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result._id = ingredient._id;
        this._ingredientService.update(result).subscribe(ingredient => {
          this.selectedIngredient = ingredient;
          this.ingredientList[index] = ingredient;
          this.showDetails = true;
        });
      }
    });
  }

  deleteIngredient(ingredient) {
    this.dialogData = {};
    this.dialogData.dialogTitle = 'Delete ingredient';
    this.dialogData.dialogMessage = 'Delete this ingredient?';
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      height: 'auto',
      data: this.dialogData
    });

    dialogRef.afterClosed().subscribe(confirmation => {
      if (confirmation) {
        this._ingredientService.delete(ingredient).subscribe(response => {
          this.selectedIngredient = {};
          this.showDetails = false;
        });
      }
    });
  }

  importIngredients() {
    this.dialogData = {filename: ''}
    const dialogRef = this.dialog.open(IngredientImportDialogComponent, {
      width: '300px',
      height: 'auto',
      data: this.dialogData
    });

    dialogRef.afterClosed().subscribe(filename => {
      if (filename) {
        console.log(filename)
        //this._ingredientService.delete(ingredient).subscribe(response => {
          //this.selectedIngredient = {};
          //this.showDetails = false;
        }//);
      //}
    });
  }
}
