import { Component, OnInit } from '@angular/core';
import {TermApiService} from "../term-api.service";
import { ActivatedRoute } from '@angular/router';
import {englishTerm} from "../schemas/englishTerm";

@Component({
  selector: 'app-term-details',
  templateUrl: './term-details.component.html',
  styleUrls: ['./term-details.component.css']
})
export class TermDetailsComponent implements OnInit {

  m_englishTerm : englishTerm;
  m_param_id : String;
  m_termType : String;

  constructor(private apiService : TermApiService, private route:ActivatedRoute) { }


  ngOnInit(): void {

   this.m_param_id= this.route.snapshot.paramMap.get("id");
   this.m_termType = this.route.snapshot.paramMap.get("termType");


  }

 getEnglishTerm() : void {
     this.apiService.getEnglishTerm().subscribe(term => (this.m_englishTerm = term));
  }
  
}
