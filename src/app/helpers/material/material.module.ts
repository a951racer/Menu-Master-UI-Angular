import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatToolbarModule,
         MatButtonModule,
         MatCardModule,
         MatTabsModule,
         MatTableModule,
         MatExpansionModule,
         MatDialogModule,
         MatInputModule,
         MatDatepickerModule,
         MatCheckboxModule,
         MatIconModule,
         MatSidenavModule,
         MatDividerModule,
         MatListModule, } from '@angular/material';
import { ScrollDispatchModule } from '@angular/cdk/scrolling'

@NgModule({
  imports: [
    CommonModule,
    MatMomentDateModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    MatTableModule,
    MatExpansionModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatIconModule,
    DragDropModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    ScrollDispatchModule
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    MatTableModule,
    MatExpansionModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatIconModule,
    DragDropModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    ScrollDispatchModule
  ],
  declarations: []
})
export class MaterialModule { }
