import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetinfoService {

  constructor() { }

  info$: ReplaySubject<string> = new ReplaySubject(1);

  emitValue(userName:string){
    this.info$.next(userName);
  }

  getValue(){
    return this.info$.asObservable();
  }

}
