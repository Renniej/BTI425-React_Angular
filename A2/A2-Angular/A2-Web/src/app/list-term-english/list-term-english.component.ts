import { Component, OnInit } from '@angular/core';
import {TermApiService} from "../term-api.service"
import {englishTerm} from "../schemas/englishTerm";

@Component({
  selector: 'app-list-term-english',
  templateUrl: './list-term-english.component.html',
  providers : [TermApiService],
  styleUrls: ['./list-term-english.component.css']
})
export class ListTermEnglishComponent implements OnInit {

   m_englishTerms : englishTerm[]

  constructor(private apiService : TermApiService ) { }

  ngOnInit(): void {
    this.getEnglishTerms();
  }

  getEnglishTerms() : void {
     this.apiService.getEnglishTerms().subscribe(terms => (this.m_englishTerms = terms));
  }


}
