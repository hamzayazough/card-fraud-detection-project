import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CardInfo } from '../card-info.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardInfoService {
  private apiUrl = 'http://localhost:3000/api/card-info';

  constructor(private http: HttpClient) {}

  saveCardInfo(cardInfo: CardInfo): Observable<any> {
    return this.http.post(this.apiUrl, cardInfo);
  }
}
