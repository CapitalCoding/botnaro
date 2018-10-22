import { FakeNewsletter } from './fake-news.class';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FakenewsService {


  constructor(private http: HttpClient) { }

  getFakeNews() {
    return this.http.get("http://192.168.1.6:8080/api/fakenews");
  }

  postFakeNews(url){
    return this.http.put("http://192.168.1.6:8080/api/add",url);
}
}
