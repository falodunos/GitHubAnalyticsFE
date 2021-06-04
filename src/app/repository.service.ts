import { Injectable } from '@angular/core';
import { Repository } from './entities/repository';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { RepositoryDTO } from '../app/entities/repositoriesDTO';
import { AuthorInfo } from '../app/entities/author-info';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  private BASE_URL = 'http://localhost:8080/github/api/v1/';
  private REST_REPOSITORIES_API = 'search/repositories?query=';
  private REPOSITORY_DETAIL = 'repository/details';

  constructor(private httpClient: HttpClient) { }

  queryParams: string;
  authorInfoList: Observable<AuthorInfo[]>;

  getRepositories(query: string): Observable<RepositoryDTO> {
    const url = this.BASE_URL + this.REST_REPOSITORIES_API + query;
    console.log("Search URL " + url);
    return this.httpClient.get<RepositoryDTO>(url);
  }


  getRepositoryDetails(commitsUrl: string, contributorsUrl: string): Promise<AuthorInfo[]> {

    const url = this.BASE_URL + this.REPOSITORY_DETAIL;
    const data = { commitsUrl: commitsUrl, contributorsUrl: contributorsUrl };
    console.log("data ", JSON.stringify(data));

    return this.httpClient.post<AuthorInfo[]>(url, data)
      .toPromise();
      // .then(result => {
      //   console.log("this.authorInfoList :: " + JSON.stringify(result["authorInfoList"]));
      //   this.authorInfoList = of(result);
      // });//.catch(e => console.log(e))

    // return this.authorInfoList;
  }

}
