import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import languageCodes from '../languageCodes/LanguageCodes.json'
import { term } from '../schemas/englishTerm';
import { TermApiService } from '../term-api.service';
import { definition } from '../schemas/definition';
@Component({
  selector: 'app-term-non-english-create',
  templateUrl: './term-non-english-create.component.html',
  styleUrls: ['./term-non-english-create.component.css']
})
export class TermNonEnglishCreateComponent implements OnInit {

  
  m_term =  {} as term; // this syntax allows for the basic initialization of an interface
  m_selectedEnglishTerm : term;
  m_englishTerms : term[];

  m_definition = {} as definition;
  m_param_id : string;
  m_termType : string;
  m_languageCodes = languageCodes;


  constructor(private apiService:TermApiService,private route : ActivatedRoute, private router : Router) { 

  }

  ngOnInit(): void {
    //this.m_param_id= this.route.snapshot.paramMap.get("id");
    //this.m_termType = this.route.snapshot.paramMap.get("termType");
    this.m_termType = "termNonEnglish";
    this.getEnglishTerms()
   
  }

  onSubmit(){
   console.log(this.m_term);
   console.log(this.m_definition)

   this.m_definition.authorName = this.m_term.authorName;
   
    //console.log(this.m_term.termEnglish);
   
    
   this.apiService.createNonEnglishTerm(this.m_term, this.m_definition).subscribe((newTerm)=>{  this.router.navigate( ["/details",this.m_termType, newTerm._id])});

  }

  
  getEnglishTerms() : void {
    this.apiService.getEnglishTerms().subscribe(terms => (this.m_englishTerms = terms));
 }


}
