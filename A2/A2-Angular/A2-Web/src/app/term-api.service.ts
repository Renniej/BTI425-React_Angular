import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import {englishTerm} from './schemas/englishTerm';
import {nonEnglishTerm} from './schemas/nonEnglishTerm'

@Injectable({
  providedIn: 'root'
})
export class TermApiService {

  apiUrl = 'http://localhost:8080/api/';
 
  constructor(private http: HttpClient) { }


  getEnglishTerms() : Observable<englishTerm[]>{

    //TODO : code error catcher s
      return this.http.get<englishTerm[]>(this.apiUrl+"termEnglish");
  }


  getEnglishTerm(id : String) : Observable<englishTerm>{

   
      return this.http.get<englishTerm>(this.apiUrl+"termEnglish/" + id);
  }
  getPopulatedEnglishTerm(id : String) : Observable<englishTerm>{
     //TODO : code error catcher s
    return this.http.get<englishTerm>(this.apiUrl+"populated_termEnglish/" + id);
  }

  getNonEnglishTerm(id : String) : Observable<nonEnglishTerm>{

    //TODO : code error catcher s
      return this.http.get<nonEnglishTerm>(this.apiUrl+"termNonEnglish/" + id);
  }

}
