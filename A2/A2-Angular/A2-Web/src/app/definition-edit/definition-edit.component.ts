import { Component, OnInit } from '@angular/core';
import { definition } from '../schemas/definition';
import { term } from '../schemas/englishTerm';
import languageCodes from '../languageCodes/LanguageCodes.json'
import { TermApiService } from '../term-api.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-definition-edit',
  templateUrl: './definition-edit.component.html',
  styleUrls: ['./definition-edit.component.css']
})
export class DefinitionEditComponent implements OnInit {

  m_definition = {} as definition;
 

 
  m_param_id : string;
  m_termType : string;
  m_languageCodes = languageCodes;

  constructor(private apiService:TermApiService, private route:ActivatedRoute, private router : Router) { }


  ngOnInit(): void {
    this.m_param_id= this.route.snapshot.paramMap.get("id");
    this.m_termType = this.route.snapshot.paramMap.get("termType");
  
    console.log("TEST TEST TES")
    

    console.log(this.m_param_id)
      this.apiService.getDefinition(this.m_param_id).subscribe(defin=>{this.m_definition = defin, console.log(defin)});
    
    
  }
  onSubmit(){
 
   this.apiService.updateDefinition(this.m_definition).subscribe((newTerm)=>{  this.router.navigate( ["/definitions"])});
 
   }
 
}
