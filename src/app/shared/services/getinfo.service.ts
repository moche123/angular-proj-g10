import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetinfoService {

  info$: ReplaySubject<string> = new ReplaySubject(1);

  emitValue(userName:string){
    this.info$.next(userName);
  }

  getValue(): Observable<string>{
    return this.info$.asObservable();
  }

}
