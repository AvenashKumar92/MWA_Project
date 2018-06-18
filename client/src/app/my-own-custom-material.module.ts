import { NgModule } from '@angular/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatCheckboxModule, 
  MatFormFieldModule, MatInputModule, MatRippleModule, 
  MatToolbarModule, MatProgressSpinnerModule, MatSidenavModule,
   MatListModule, MatIconModule, MatTableModule, 
   MatDialogModule, MatSelectModule, MatStepperModule} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatCardModule,MatCheckboxModule, 
    NoopAnimationsModule, MatFormFieldModule, MatInputModule,
     MatRippleModule, MatToolbarModule, MatProgressSpinnerModule, 
     MatSidenavModule, MatListModule, MatIconModule,
  MatTableModule, MatDialogModule, MatSelectModule],
  
  exports: [MatButtonModule, MatCardModule,MatCheckboxModule, 
    NoopAnimationsModule, MatFormFieldModule, MatInputModule,
     MatRippleModule, MatToolbarModule, MatProgressSpinnerModule, 
     MatSidenavModule, MatListModule, MatIconModule,
  MatTableModule, MatDialogModule, MatSelectModule, MatStepperModule]
})
export class MyOwnCustomMaterialModule { }
