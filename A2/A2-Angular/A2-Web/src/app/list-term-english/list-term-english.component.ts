import { Component, OnInit } from '@angular/core';
import {TermApiService} from "../term-api.service"
import {term} from "../schemas/englishTerm";
import { Router } from '@angular/router';
import { SharedSearchTextService } from '../shared-search-text.service';


@Component({
  selector: 'app-list-term-english',
  templateUrl: './list-term-english.component.html',
  providers : [TermApiService],
  styleUrls: ['./list-term-english.component.css']
})
export class ListTermEnglishComponent implements OnInit {

   m_englishTerms : term[]
    searchText : string;

  constructor(private sharedSearchText : SharedSearchTextService, private apiService : TermApiService, private router:Router) { }

  ngOnInit(): void {
    this.getEnglishTerms();
    this.sharedSearchText.sharedSearchText.subscribe(text => this.searchText = text);
  }


  deleteTerm(termID : String): void{
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';

    this.apiService.deleteEnglishTerm(termID).subscribe(() => ( this.router.navigate(['/termEnglish'])));

   
   ;
  }

  getEnglishTerms() : void {
     this.apiService.getEnglishTerms().subscribe(terms => (this.m_englishTerms = terms));
  }

  redirectToDetails(id) : void{
    this.router.navigate(['/details','termEnglish',id]);
  }


}
