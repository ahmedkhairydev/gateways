import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Gateway } from 'src/app/core/interfaces/gateway.interface';
import { HttpService } from 'src/app/core/services/http/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  gateways: Gateway[] = [];

  constructor(private router: Router, private http: HttpService) { }

  ngOnInit(): void {
    this.getAllGateways();
  }

  getAllGateways() {
    this.http.get<any>('Gateway/GetAll').subscribe(gateways => this.gateways = gateways);
  }

  /**
   * navigate to edit page 
   * 
   * @param {number} gatewayId
   * @memberof HomeComponent
   */
  edit(gatewayId: number) {
    this.router.navigateByUrl(`gateway/${gatewayId}/edit`);
  }

  /**
   * navigate to gateway page details
   *
   * @param {number} gatewayId
   * @memberof HomeComponent
   */
  view(gatewayId: number) {
    this.router.navigateByUrl(`gateway/${gatewayId}`);
  }
}
