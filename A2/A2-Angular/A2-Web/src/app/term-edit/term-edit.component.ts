import { Component, OnInit } from '@angular/core';
import { TermApiService } from '../term-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { term } from '../schemas/englishTerm';
import languageCodes from '../languageCodes/LanguageCodes.json'

@Component({
  selector: 'app-term-edit',
  templateUrl: './term-edit.component.html',
  styleUrls: ['./term-edit.component.css']
})
export class TermEditComponent implements OnInit {

  m_term = {} as term;
  m_param_id : string;
  m_termType : string;
  m_languageCodes = languageCodes;

  constructor(private apiService: TermApiService, private route : ActivatedRoute, private router : Router) { }

  ngOnInit(): void {

    this.m_param_id= this.route.snapshot.paramMap.get("id");
    this.m_termType = this.route.snapshot.paramMap.get("termType");
    if (this.m_termType === "termEnglish")
      this.getEnglishTerm();
    else if(this.m_termType === "termNonEnglish")
      this.getNonEnglishTerm();
  }

  getEnglishTerm() : void {
    this.apiService.getEnglishTerm(this.m_param_id).subscribe(term => ( this.m_term = term, console.log(term)));
    console.log(this.m_languageCodes);
 }


 getNonEnglishTerm() : void {
  this.apiService.getNonEnglishTerm(this.m_param_id).subscribe(term => ( this.m_term = term, console.log(term)));
  console.log(this.m_languageCodes);
}

  onSubmit(){
    //this.m_term.dateRevised = Date.now().toString();
    if (this.m_termType === "termEnglish")
      this.apiService.updateEnglishTerm(this.m_term).subscribe(()=>{  this.router.navigate( ["/details",this.m_termType, this.m_term._id])});
    else if(this.m_termType === "termNonEnglish"){
      this.apiService.updateNonEnglishTerm(this.m_term).subscribe(()=>{  this.router.navigate( ["/details",this.m_termType, this.m_term._id])});
    }
  }

}
