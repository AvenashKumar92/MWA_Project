import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatButtonModule, MatToolbarModule, MatInputModule,
    MatCardModule, MatProgressSpinnerModule, MatSidenavModule, MatListModule,
    MatIconModule, MatTableModule, MatDialogModule, MatSelectModule
} from '@angular/material';

@NgModule({
    imports: [MatButtonModule, MatToolbarModule, MatToolbarModule, MatInputModule,
        MatCardModule, MatProgressSpinnerModule, MatSidenavModule, MatListModule, MatIconModule,
        MatTableModule, MatDialogModule, MatSelectModule],
    exports: [MatButtonModule, MatToolbarModule, MatToolbarModule, MatInputModule,
        MatCardModule, MatProgressSpinnerModule, MatSidenavModule, MatListModule,
        MatIconModule, MatTableModule, MatDialogModule, MatSelectModule]
})


export class MaterialModule { }