import { NgModule } from '@angular/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatCheckboxModule, 
  MatFormFieldModule, MatInputModule, MatRippleModule, 
  MatToolbarModule, MatProgressSpinnerModule, MatSidenavModule,
   MatListModule, MatIconModule, MatTableModule, 
   MatDialogModule, MatSelectModule, MatStepperModule, MatExpansionModule, MatAutocompleteModule} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatCardModule,MatCheckboxModule, 
    NoopAnimationsModule, MatFormFieldModule, MatInputModule,
     MatRippleModule, MatToolbarModule, MatProgressSpinnerModule, 
     MatSidenavModule, MatListModule, MatIconModule,
  MatTableModule, MatDialogModule, MatSelectModule, MatExpansionModule, MatAutocompleteModule],
  
  exports: [MatButtonModule, MatCardModule,MatCheckboxModule, 
    NoopAnimationsModule, MatFormFieldModule, MatInputModule,
     MatRippleModule, MatToolbarModule, MatProgressSpinnerModule, 
     MatSidenavModule, MatListModule, MatIconModule,
  MatTableModule, MatDialogModule, MatSelectModule, MatStepperModule, MatExpansionModule, MatAutocompleteModule]
})


export class MaterialModule { }