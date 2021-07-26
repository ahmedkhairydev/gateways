import { Component, Input, OnInit } from '@angular/core';
import { Gateway } from 'src/app/core/interfaces/gateway.interface';

@Component({
  selector: 'app-gateway',
  templateUrl: './gateway.component.html',
  styleUrls: ['./gateway.component.scss']
})
export class GatewayComponent implements OnInit {

  @Input() gateway!: Gateway;

  constructor() { }

  ngOnInit(): void {
  }

}
