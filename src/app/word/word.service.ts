import { ApiResponse } from './response.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Word } from './models/word.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  private baseUrl: string = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getWords() {
    return this.http
    .get<ApiResponse<Word[]>>(`${this.baseUrl}/words`)
    .pipe(map((resp) => resp?.data));
  }

  saveWord(word: Word) {
    return this.http
    .post(`${this.baseUrl}/words`, word);
  }
}
