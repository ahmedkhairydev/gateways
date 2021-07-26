import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AlertService } from '../alert/alert.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private serverUrl = environment.hostAPI;

  constructor(private http: HttpClient, private alertService: AlertService) { }

  get<T>(APIName: string): Observable<T> {
    return this.http.get(`${this.serverUrl}${APIName}`).pipe(map((event: any) => {
      return event.body;
    }));
  }

  post<T>(APIName: string, body?: any): Observable<T> {
    return this.http.post(`${this.serverUrl}${APIName}`, body ? body : null, { observe: "events" }).pipe(map((event: any) => {
      if (event.type === HttpEventType.Response) {
        this.alertHandling(event.status)
        return event.body;
      }
    }));
  }

  delete(APIName: string, body?: any): Observable<any> {
    return this.http.delete(`${this.serverUrl}${APIName}`, body ? body : null).pipe(map((event: any) => {
      this.alertHandling(event.status);
      return event.body;
    }));
  }

  private alertHandling(statusCode: any) {
    this.alertService.success('Successfully Done...');
  }
}
