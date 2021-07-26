import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditViewGatewayComponent } from './pages/add-edit-view-gateway/add-edit-view-gateway.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'gateway',
    children: [
      {
        path: 'add',
        data: { type: 'add' },
        component: AddEditViewGatewayComponent
      },
      {
        path: ':id',
        children: [
          {
            path: '',
            data: { type: 'view' },
            component: AddEditViewGatewayComponent
          },
          {
            path: 'edit',
            data: { type: 'edit' },
            component: AddEditViewGatewayComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
