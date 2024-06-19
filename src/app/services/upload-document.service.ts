import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UploadDocumentService {
  constructor(private httpClient: HttpClient) {}

  upload(form: FormData): Observable<any> {
    return this.httpClient.post(`${environment.url}/document/updateXML`, form);
  }
}
