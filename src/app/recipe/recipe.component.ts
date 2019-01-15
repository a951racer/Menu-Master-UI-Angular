import { Component, OnInit } from '@angular/core';
import { RecipeService } from './recipe.service';
import { MatTable, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { recipe } from './recipe.model';

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
  displayedRecipeColumns = ['name','description'];
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


  }

  editRecipe(recipe) {

  }

  deleteRecipe(recipe) {

  }
}
