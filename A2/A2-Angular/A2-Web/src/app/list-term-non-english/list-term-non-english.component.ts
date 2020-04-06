import { Component, OnInit } from '@angular/core';

import { SharedSearchTextService } from '../shared-search-text.service';
import {TermApiService} from "../term-api.service"
import {term} from "../schemas/englishTerm";
import { Router } from '@angular/router';

import languageCodes from '../languageCodes/LanguageCodes.json'

@Component({
  selector: 'app-list-term-non-english',
  templateUrl: './list-term-non-english.component.html',
  styleUrls: ['./list-term-non-english.component.css']
})
export class ListTermNonEnglishComponent implements OnInit {

  m_NonEnglishTerms : term[]
  searchText : string;
  m_languageCodes = languageCodes;

  constructor(private apiService : TermApiService, private router:Router,private sharedSearchText : SharedSearchTextService) { }

  ngOnInit(): void {
    this.getNonEnglishTerms();
  }


  getLanguageText(langCode : string) : string{

    var foundLanguage  : string = "¯\_(ツ)_/¯";

    this.m_languageCodes.forEach(function(langObj){
  
      if (langCode === langObj.languageCode){
        console.log(langObj);
        console.log(langCode)
        foundLanguage = langObj.language;
    }
    })

    return foundLanguage
     

  }

  deleteTerm(termID : String): void{
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';

    this.apiService.deleteNonEnglishTerm(termID).subscribe(() => ( this.router.navigate(['/termNonEnglish'])));
    this.sharedSearchText.sharedSearchText.subscribe(text => this.searchText = text);
   
   ;
  }

  getNonEnglishTerms() : void {
     this.apiService.getNonEnglishTerms().subscribe(terms => (this.m_NonEnglishTerms = terms));
  }

  redirectToDetails(id) : void{
    this.router.navigate(['/details','termNonEnglish',id]);
  }


}
