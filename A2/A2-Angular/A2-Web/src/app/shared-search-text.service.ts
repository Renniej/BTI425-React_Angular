import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SharedSearchTextService {

  private searchText = new BehaviorSubject('');
  sharedSearchText  = this.searchText.asObservable();

  constructor() { }

  textChanged(text : string){
    this.searchText.next(text);
  }

}
