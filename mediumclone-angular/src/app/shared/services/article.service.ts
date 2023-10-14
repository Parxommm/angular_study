import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { GetArticleResponseInterface } from '../types/get-article-response.interface';
import { environment } from 'src/environments/environment';
import { ArticleInterface } from '../types/article.interface';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private http: HttpClient) {}

  getArticle(slug: string): Observable<ArticleInterface> {
    const fullUrl = `${environment.apiUrl}/articles/${slug}`;
    return this.http
      .get<GetArticleResponseInterface>(fullUrl)
      .pipe(map((response) => response.article));
  }
}
