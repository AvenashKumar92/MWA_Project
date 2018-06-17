import { NgModule } from '@angular/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatRippleModule} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatCardModule,MatCheckboxModule, NoopAnimationsModule, MatFormFieldModule, MatInputModule, MatRippleModule],
  exports: [MatButtonModule, MatCardModule,MatCheckboxModule, NoopAnimationsModule, MatFormFieldModule, MatInputModule, MatRippleModule]
})
export class MyOwnCustomMaterialModule { }
