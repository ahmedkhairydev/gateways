import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// components
import { LoadingComponent } from './components/loading/loading.component';
import { CollapseComponent } from './components/collapse/collapse.component';

// material modules
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';

// pipe
import { ValidationHandlerPipe } from './pipes/validation-handler.pipe';

@NgModule({
  declarations: [
    LoadingComponent,
    CollapseComponent,
    ValidationHandlerPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatFormFieldModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatInputModule
  ],
  exports: [
    LoadingComponent,
    CollapseComponent,
    ValidationHandlerPipe,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatFormFieldModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatInputModule
  ]
})
export class SharedModule { }
