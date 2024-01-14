import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from '@angular/material/form-field';

import { ExchangeService } from "../core/services/exchange.service";
import { debounceTime, take } from "rxjs";
import { ECurrency } from "../core/enums/currency.enum";
import { Currencies } from "../core/models/currencies.model";

@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    CommonModule
  ],
  providers: [ExchangeService]
})
export class ConvertComponent {
  currencyFrom!: ECurrency;
  currencyTo!: ECurrency;

  currencyAmountTo: number = 0;
  currencyAmountFrom: number = 0;
  currencies: ECurrency[] = [
    ECurrency.HRIVNA,
    ECurrency.EURO,
    ECurrency.DOLLAR,
  ];
  private _currencyRate = 0;

  constructor(private exchangeService: ExchangeService) { }

  changeCurrencyAmount() : void{
    this.currencyAmountTo = this.currencyAmountFrom * this._currencyRate;
    this.currencyAmountTo = (Math.round(this.currencyAmountTo * 100) / 100);
  }

  changeCurrencyAmountReversed() : void{
    this.currencyAmountFrom = this.currencyAmountTo / this._currencyRate;
    this.currencyAmountFrom = (Math.round(this.currencyAmountFrom * 100) / 100);
  }
  

  changeCurrency(): void {
    if (this.currencyFrom && this.currencyTo) {
      this.getCurrencyPair(this.currencyFrom, this.currencyTo);
    }
  }

  getCurrencyPair(currencyFrom: ECurrency, currencyTo: ECurrency): void {
    this.exchangeService.getCurrencyPair(currencyFrom, currencyTo)
      .pipe(
        take(1),
        debounceTime(300),
      )
      .subscribe(
        (response: Currencies) => {
          this._currencyRate = response.rate;
          this.changeCurrencyAmount();
          this.changeCurrencyAmountReversed();
          console.warn(this._currencyRate);
        },
        (error) => {
          console.error("Error fetching currency pair:", error);
        }
      );
  }
}
