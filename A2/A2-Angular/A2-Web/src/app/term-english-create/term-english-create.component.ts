import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import languageCodes from '../languageCodes/LanguageCodes.json'
import { term } from '../schemas/englishTerm';
import { TermApiService } from '../term-api.service';
import { definition } from '../schemas/definition';

@Component({
  selector: 'app-term-english-create',
  templateUrl: './term-english-create.component.html',
  styleUrls: ['./term-english-create.component.css']
})
export class TermEnglishCreateComponent implements OnInit {


  m_term =  {} as term; // this syntax allows for the basic initialization of an interface
  m_definition = {} as definition;
  m_param_id : string;

  m_languageCodes = languageCodes;


  constructor(private apiService:TermApiService,private route : ActivatedRoute, private router : Router) { 

  }

  ngOnInit(): void {
    this.m_param_id= this.route.snapshot.paramMap.get("id");
    

  }

  onSubmit(){
   console.log(this.m_term);
   console.log(this.m_definition)

   this.m_term.languageCode = "en";
   this.m_definition.authorName = this.m_term.authorName;

   

   this.apiService.createEnglishTerm(this.m_term, this.m_definition).subscribe((newTerm)=>{  this.router.navigate( ["/details","termEnglish", newTerm._id])});

  }

}
