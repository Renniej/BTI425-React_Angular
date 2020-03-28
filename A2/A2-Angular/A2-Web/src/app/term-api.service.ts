import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import {term} from './schemas/englishTerm';
import {nonEnglishTerm} from './schemas/nonEnglishTerm'
import { definition } from './schemas/definition';

@Injectable({
  providedIn: 'root'
})
export class TermApiService {

  apiUrl = 'http://localhost:8080/api/';
 
  constructor(private http: HttpClient) { }


  getEnglishTerms() : Observable<term[]>{

    //TODO : code error catcher s
      return this.http.get<term[]>(this.apiUrl+"termEnglish");
  }


  getEnglishTerm(id : String) : Observable<term>{

   
      return this.http.get<term>(this.apiUrl+"termEnglish/" + id);
  }
  getPopulatedEnglishTerm(id : String) : Observable<term>{
     //TODO : code error catcher s
    return this.http.get<term>(this.apiUrl+"populated_termEnglish/" + id);
  }

  getNonEnglishTerm(id : String) : Observable<term>{

    //TODO : code error catcher s
      return this.http.get<term>(this.apiUrl+"termNonEnglish/" + id);
  }

  getDefinition(id : String): Observable<definition>{
    return this.http.get<definition>(this.apiUrl+"definition/" + id);
  }

  updateEnglishTerm(Term : term){
      return  this.http.put<term>(this.apiUrl+ "termEnglish/" + Term._id, Term);
  }

  modifyHelpYes(id : String, termType : string, increment : boolean) : Observable<void>{

    console.trace();
    console.log(id,termType,increment)
    let url ='';

      if (increment === true){
        url = this.apiUrl + termType + "/helpYes/" + id + "/increment";
      }
      else if(increment === false){
        url = this.apiUrl +   termType + "/helpYes/" + id + "/decrement";
      }

      return this.http.get<void>(url);

  }


  
  modifyHelpNo(id : String, termType : string, increment : boolean) : Observable<void>{
  
    console.trace();
    console.log(id,termType,increment)
    let url ='';

    if (increment === true){
      url = this.apiUrl+   termType + "/helpNo/" + id + "/increment";
    }
    else if(increment === false){
      url = this.apiUrl+   termType + "/helpNo/" + id + "/decrement";
    }

    return this.http.get<void>(url);
}

}
