import { Component, OnInit } from '@angular/core';
import { definition } from '../schemas/definition';
import { term } from '../schemas/englishTerm';
import languageCodes from '../languageCodes/LanguageCodes.json'
import { TermApiService } from '../term-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-definition-create',
  templateUrl: './definition-create.component.html',
  styleUrls: ['./definition-create.component.css']
})
export class DefinitionCreateComponent implements OnInit {


  m_definition = {} as definition;
  m_terms : term[];

  m_selectedTermID : string;
  m_param_id : string;
  m_termType : string;
  m_languageCodes = languageCodes;

  constructor(private apiService:TermApiService, private route:ActivatedRoute, private router : Router) { }


  ngOnInit(): void {
    this.m_param_id= this.route.snapshot.paramMap.get("id");
    this.m_termType = this.route.snapshot.paramMap.get("termType");
    this.m_selectedTermID = this.m_param_id;

    

    if (this.m_termType === "termEnglish"){
        this.apiService.getEnglishTerms().subscribe(terms=> this.m_terms = terms);
    }
    else if (this.m_termType === "termNonEnglish"){
      this.apiService.getNonEnglishTerms().subscribe(terms=>this.m_terms = terms);
    }
    
    
  }

  onSubmit(){
    console.log(this.m_selectedTermID);
    console.log(this.m_definition)
 
    //this.m_definition.authorName = this.m_term.authorName;
    
     //console.log(this.m_term.termEnglish);
    
     
    this.apiService.createDefinition(this.m_definition,this.m_termType, this.m_selectedTermID).subscribe(()=>{  this.router.navigate( ["/details",this.m_termType, this.m_selectedTermID])});
 
   }
}
