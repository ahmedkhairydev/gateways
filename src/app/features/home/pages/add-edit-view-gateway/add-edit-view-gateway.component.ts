import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Gateway } from 'src/app/core/interfaces/gateway.interface';
import { HttpService } from 'src/app/core/services/http/http.service';

@Component({
  selector: 'app-add-edit-view-gateway',
  templateUrl: './add-edit-view-gateway.component.html',
  styleUrls: ['./add-edit-view-gateway.component.scss']
})
export class AddEditViewGatewayComponent implements OnInit {

  type = ''; // add OR edit OR view
  gatewayFormGroup!: FormGroup;
  gateway!: Gateway;
  gatewayId: string | null = '';

  constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder, private http: HttpService, private router: Router) { }

  ngOnInit(): void {
    this.type = this.activatedRoute.snapshot.data.type;
    this.gatewayId = this.activatedRoute.snapshot.paramMap.get('id');
    this.type !== 'add' ? this.getGateway() : this.initGatewayForm();
  }

  getGateway() {
    this.http.get<Gateway>(`Gateway/Get/${this.gatewayId}`).subscribe(gateway => {
      this.gateway = gateway;
      this.type !== 'view' ? this.initGatewayForm() : '';
    }, () => this.router.navigateByUrl('/'));
  }

  initGatewayForm() {
    this.gatewayFormGroup = this.fb.group({
      id: [this.gatewayId],
      serialNumber: ['', Validators.required],
      gatewayName: ['', Validators.required],
      ip: ['', Validators.required],
      devices: this.fb.array([])
    });

    if (this.type === 'add') {
      this.initDeviceForm();
    } else if (this.type === 'edit') {
      this.gateway.devices.map(() => this.initDeviceForm());
      this.gatewayFormGroup.patchValue(this.gateway);
    }
  }

  initDeviceForm() {
    this.gatewayDevices.push(this.fb.group({
      deviceId: ['', [Validators.required, Validators.min(0)]],
      vendor: ['', Validators.required],
      status: ['online', Validators.required]
    }));
  }

  get gatewayDevices() {
    return this.gatewayFormGroup.get('devices') as FormArray;
  }

  addEditGateway() {
    this.gatewayFormGroup.value.devices.map((device: any) => device.createdDate = new Date().toLocaleDateString());
    this.http.post<any>(`Gateway/${this.type === 'edit' ? `Update/${this.gatewayId}` : 'Add'}`, this.gatewayFormGroup.value).subscribe(
      (event) => { if (event.status === 200) this.router.navigateByUrl('/') }
    );
  }

  /**
   * prevent only numbers
   *
   * @param {KeyboardEvent} event
   * @returns
   * @memberof AddEditViewGatewayComponent
   */
  onlyNumber(event: KeyboardEvent) {
    const regex = /^\d*$/;
    const allowKeys = [8, 9, 37, 38, 39, 40, 46, 110, 190]
    const charKey = event.key;

    if (regex.test(charKey) || event.ctrlKey || event.shiftKey || allowKeys.includes(event.which)) {
      return true;
    }

    return false;
  }
}
