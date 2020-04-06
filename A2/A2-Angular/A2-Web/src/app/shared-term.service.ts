import { Injectable } from '@angular/core';
import { term } from './schemas/englishTerm';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedTermService {


  private curTerm = new BehaviorSubject(null);
  sharedTerm = this.curTerm.asObservable();
   

  constructor() { }

  changeTerm(aTerm : term){

    this.curTerm.next(aTerm);

  }
}
