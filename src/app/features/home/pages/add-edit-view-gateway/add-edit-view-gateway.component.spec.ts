import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditViewGatewayComponent } from './add-edit-view-gateway.component';

describe('AddEditViewGatewayComponent', () => {
  let component: AddEditViewGatewayComponent;
  let fixture: ComponentFixture<AddEditViewGatewayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditViewGatewayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditViewGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
