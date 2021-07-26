import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddEditViewGatewayComponent } from './pages/add-edit-view-gateway/add-edit-view-gateway.component';
import { GatewayComponent } from './components/gateway/gateway.component';


@NgModule({
  declarations: [
    HomeComponent,
    AddEditViewGatewayComponent,
    GatewayComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
