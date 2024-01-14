import { Component, OnInit } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatDividerModule } from "@angular/material/divider";

import { ExchangeService } from "../core/services/exchange.service";
import { Observable, Subscription } from "rxjs";
import { Currencies } from "../models/currencies.model";
import { CommonModule } from "@angular/common";


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    standalone: true,
    styleUrls: ['./header.component.css'],
    imports: [
        MatToolbarModule,
        MatDividerModule,
        CommonModule
    ],
    providers: [ExchangeService]
})
export class HeaderComponent {
    currenciesUsdToUah: Observable<Currencies> = this.exchangeService.getCurrencyPair('USD', 'UAH');
    currenciesEurToUah: Observable<Currencies> = this.exchangeService.getCurrencyPair('EUR', 'UAH');

    constructor(private exchangeService: ExchangeService) { }
}