import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IRickMortyApi, IRickMortyApiCharacters } from '../models/pages.model';
import { Observable, catchError, map, of, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2'

@Injectable()
export class PagesService {
  apiUrl = environment.apiUrl;
  private baseUrl: string = environment.baseUrl;

  constructor(
    private _httpClient: HttpClient
  ) { }

  getCharacteres(): Observable<IRickMortyApiCharacters[]> {
    return this._httpClient
      .get<IRickMortyApi>(this.apiUrl)
      .pipe(
        map((res) => res.results), //! MAP, TAP, FILTER, REDUCE  => OPERATORS
       // tap(console.log),
        catchError((_) => {
          Swal.fire(
            'Oops!',
            'Algo falló con la consulta',
            'error'
          );
          return of([]); //! of, from => CREAR UN OBSERVABLE
        })
      );
  }



  addFavorite(body: any): Observable<any> {
    const url = `${this.baseUrl}/api/favorite/newFavorite`;



    return this._httpClient.post<any>(url, body)
      .pipe(
        map(resp => resp.ok),
        catchError(err => {
          // alert(err.error.msg)
          Swal.fire(
            'Oops',
            err.error.msg,
            'error'
          )
          return of(err.error)
        })
      )
  }




  getFavorites(): Observable<any[]> {
    const url = `${this.baseUrl}/api/favorite/${localStorage.getItem('userId')}`;

    return this._httpClient.get(url)
      .pipe(
        map((todo: any) => {
          return todo.favoritos
        })
      )
  }
}
