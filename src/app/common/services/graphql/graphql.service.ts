import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GRAPHQL_API_URL } from '../../constants/AppConts';
import { catchError, map, Observable, of } from 'rxjs';
import { ApiResponse } from '../../models/api/api.model';
import { GraphQLResponse } from '../../models/api/graphql.model';

@Injectable({
  providedIn: 'root',
})
export class GraphQLService {

  constructor(private http: HttpClient) { }

  public query<TResponse>(query: string): Observable<ApiResponse<TResponse>> {
    return this.http.post<GraphQLResponse<TResponse>>(GRAPHQL_API_URL, { query }, {
      headers: {
        "Content-Type": "application/json",
      }
    })
      .pipe(
        map(response => {
          var graphResponse = (response as GraphQLResponse<TResponse>);

          if (graphResponse.errors != null && graphResponse.errors.length > 0)
            return ApiResponse.fail<TResponse>(graphResponse.errors.map(x => x.message).join(", "))

          return ApiResponse.success<TResponse>(response.data!)
        }),
        catchError(error => {
          if (error.status === 0)
            return of(ApiResponse.fail<TResponse>("A network error occurred"));

          return of(ApiResponse.fail<TResponse>("Unknown Error"));
        })
      )
  }
}
