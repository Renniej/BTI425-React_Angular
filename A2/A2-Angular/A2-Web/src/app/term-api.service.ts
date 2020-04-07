import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
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



  createEnglishTerm(Term: term, def :definition){

    var data = {termObj : Term, definitionObj : def};
    console.log(data)
    return this.http.post<term>(this.apiUrl + "termEnglish",data );
  }
  
  updateEnglishTerm(Term : term){
    return  this.http.put<term>(this.apiUrl+ "termEnglish/" + Term._id, Term);
  }

  deleteEnglishTerm(TermID: String){
    return  this.http.delete<term>(this.apiUrl+ "termEnglish/" + TermID);
  }


  getNonEnglishTerm(id : String) : Observable<term>{

    //TODO : code error catcher s
      return this.http.get<term>(this.apiUrl+"termNonEnglish/" + id);
  }

  getNonEnglishTerms() : Observable<term[]>{

    //TODO : code error catcher s
      return this.http.get<term[]>(this.apiUrl+"termNonEnglish");
  }

  getPopulatedNonEnglishTerm(id : String) : Observable<term>{
    //TODO : code error catcher s
   return this.http.get<term>(this.apiUrl+"populated_termNonEnglish/" + id);
 }

  updateNonEnglishTerm(Term : term){
    return  this.http.put<term>(this.apiUrl+ "termNonEnglish/" + Term._id, Term);
  }

  createNonEnglishTerm(Term: term, def :definition){
    return this.http.post<term>(this.apiUrl + "termNonEnglish", {termObj : Term, definitionObj : def});
  }

  deleteNonEnglishTerm(TermID: String){
    return  this.http.delete<term>(this.apiUrl+ "termNonEnglish/" + TermID);
  }

  createDefinition(newDefinition : definition, termType : string, termID : string){

      var url;

      if (termType === "termEnglish"){
        url = this.apiUrl + "eng_definition/" + termID;
      }
      else if (termType === "termNonEnglish"){
        url = this.apiUrl + "noneng_definition/" + termID;
      }

      return this.http.post<definition>(url, newDefinition); 

  }

  getDefinition(id : String): Observable<definition>{
    return this.http.get<definition>(this.apiUrl+"definition/" + id);
  }

  getAllDefinitions(): Observable<definition[]>{
    return this.http.get<definition[]>(this.apiUrl+"definition");
  }

  updateDefinition(defin : definition){
    return this.http.put(this.apiUrl+"definition/" + defin._id, defin);
  }

  deleteDefintion(id : String){
    return this.http.delete(this.apiUrl+"definition/" + id);
  }

  
  modifyHelpYes(id : String, termType : string, increment : boolean) : Observable<void>{

    
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
