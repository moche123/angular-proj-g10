import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IRickMortyApi, IRickMortyApiCharacters } from '../models/pages.model';
import { Observable, catchError, map, of, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2'

@Injectable()
export class PagesService {
  baseUrl = environment.apiUrl;
  constructor(
    private _httpClient: HttpClient
  ) { }

  getCharacteres(): Observable<IRickMortyApiCharacters[]> {
    return this._httpClient
      .get<IRickMortyApi>(this.baseUrl)
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


  getFavorites(): Observable<IRickMortyApiCharacters[]> {
    return this._httpClient
      .get<IRickMortyApi>(this.baseUrl)
      .pipe(
        map((res) => res.results),//*SE ESTA DANDO UNA SOLA EMISIÓN //! MAP, TAP, FILTER, REDUCE  => OPERATORS
        //* take(5) => VA A TOMAR 5 EMISIONES 
        map((res) => res.slice(0,5)),
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
}
