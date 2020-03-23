import { Component, OnInit } from '@angular/core';
import {TermApiService} from "../term-api.service";
import { ActivatedRoute, Router } from '@angular/router';
import {englishTerm} from "../schemas/englishTerm";
import { definition } from '../schemas/definition';

@Component({
  selector: 'app-term-details',
  templateUrl: './term-details.component.html',
  providers : [TermApiService],
  styleUrls: ['./term-details.component.css']
})
export class TermDetailsComponent implements OnInit {

  m_term : englishTerm;
  m_definitions : definition[];

  m_param_id : String;
  m_termType : String;
  

  constructor(private apiService : TermApiService, private route:ActivatedRoute) { }


  ngOnInit(): void {

    this.m_param_id= this.route.snapshot.paramMap.get("id");
    this.m_termType = this.route.snapshot.paramMap.get("termType");
    if (this.m_termType === "termEnglish")
      this.getPopulatedEnglishTerm();
   
      



  }

 getPopulatedEnglishTerm() : void {
     this.apiService.getPopulatedEnglishTerm(this.m_param_id).subscribe(term => ( this.m_term = term, this.m_definitions = term.definitions, console.log(term)));
     
  }

 
  
  
}
