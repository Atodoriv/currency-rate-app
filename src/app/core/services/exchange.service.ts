import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable, map } from "rxjs";
import { Currencies } from "../models/currencies.model";



@Injectable()
export class ExchangeService {
    private apiKey = environment.EXCHANGE_RATE_API_KEY;
    private apiUrl = 'https://v6.exchangerate-api.com/v6/' + this.apiKey;


    constructor(private http: HttpClient) { }
    getCurrencyPair(currencyFrom: string, currencyTo: string): Observable<Currencies> {
        return this.http.get<Currencies>(this.apiUrl + `/pair/${currencyFrom}/${currencyTo}`)
        .pipe(
          map((response: any) => ({
            currencyFrom: response.base_code,
            currencyTo: response.target_code,
            rate: response.conversion_rate
          }))
        );
      }
    }