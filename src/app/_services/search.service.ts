import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    // tslint:disable-next-line: variable-name
    private _http: HttpClient
  ) { }

  getItems() {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': (window as any).localStorage.getItem('ionic-demo-auth') || ''
      })
    };
    return this._http.get('http://localhost:8080/api/v1/formation?q=', httpOptions)
    .pipe(
      tap((res: {code: number, items: any[], token: string}) => (res.token)
        ? (window as any).localStorage.setItem('ionic-demo-auth', res.token)
        : null
      ),
      map((res: {code: number, items: any[], token: string}) => res.items || null),
      tap(data => console.log('GET: /items', data))
    );
  }
}
