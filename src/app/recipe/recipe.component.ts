import { Component, OnInit } from '@angular/core';
import { RecipeService } from './recipe.service';
import { MatTable, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { recipe } from './recipe.model';
import { RecipeDialogComponent } from './recipe-dialog/recipe-dialog.component'
import { ConfirmationDialogComponent } from '../helpers/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
  providers: [ RecipeService ]
})

export class RecipeComponent implements OnInit {
  recipeList: any;
  selectedRecipe: any;
  showDetails = false;
  showEdit = false;
  dialogData: any;

  constructor(private _recipeService: RecipeService,
              public dialog: MatDialog)
  { }

  ngOnInit() {
    this._recipeService.list().subscribe(recipeList  => {
      this.recipeList = recipeList;
      this.selectedRecipe = {};
    });
  }

  onCardClick(id) {
    if (this.selectedRecipe._id === id) {
      this.selectedRecipe = {};
      this.showDetails = false;
    } else {
      this._recipeService.readOne(id).subscribe(recipe => {
        this.selectedRecipe = recipe;
        this.showDetails = true;
      });
    }
  }


  onDetailsClick() {
    this.selectedRecipe = {};
    this.showDetails = false;
  }

  handleButtonClick(buttonName) {
    switch (buttonName) {
      case 'edit':
        this.editRecipe(recipe);
        break;
      case 'close':
        this.selectedRecipe = {};
        this.showDetails = false;
        break;
      case 'delete':
        this.deleteRecipe(this.selectedRecipe);
        break;
    }
  }

  newRecipe() {
    let newrecipe = new recipe();
    this.dialogData = newrecipe;
    this.dialogData.dialogTitle = 'New Recipe';
    const dialogRef = this.dialog.open(RecipeDialogComponent, {
      width: '700px',
      height: 'auto',
      data: this.dialogData
    });

    dialogRef.afterClosed().subscribe(newRecipe => {
      if (newRecipe) {
        this._recipeService.insert(newRecipe).subscribe(recipe => {
          this.selectedRecipe = recipe;
          this.showDetails = true;
          const newRecipeList = [...this.recipeList];
          newRecipeList.push(recipe);
          this.recipeList = newRecipeList;

        });
      }
    });
  }

  editRecipe(recipe) {
    let selectedIndex = this.recipeList.findIndex((r) => r._id === recipe._id);
    this.dialogData = this.selectedRecipe;
    this.dialogData.dialogTitle = 'Edit Recipe';
    const dialogRef = this.dialog.open(RecipeDialogComponent, {
      width: '700px',
      height: 'auto',
      data: this.dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.id = this.selectedRecipe.id;
        this._recipeService.update(result).subscribe(recipe => {
          this.selectedRecipe = recipe;
          const newRecipeList = [...this.recipeList];
          newRecipeList[selectedIndex] = recipe;
          this.recipeList = newRecipeList;

          //this.recipeList[index] = recipe;
          this.showDetails = true;
        });
      }
    });
  }

  deleteRecipe(recipe) {
    this.dialogData = {};
    this.dialogData.dialogTitle = 'Delete recipe';
    this.dialogData.dialogMessage = 'Delete this recipe?';
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      height: 'auto',
      data: this.dialogData
    });

    dialogRef.afterClosed().subscribe(confirmation => {
      if (confirmation) {
        this._recipeService.delete(recipe).subscribe(response => {
          this.selectedRecipe = {};
          this.showDetails = false;
        });
      }
    });
  }
}
