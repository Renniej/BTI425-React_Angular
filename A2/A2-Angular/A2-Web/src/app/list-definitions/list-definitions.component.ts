import { Component, OnInit } from '@angular/core';
import {TermApiService} from "../term-api.service";
import { ActivatedRoute, Router } from '@angular/router';
import {term} from "../schemas/englishTerm";
import { definition } from '../schemas/definition';

@Component({
  selector: 'app-list-definitions',
  templateUrl: './list-definitions.component.html',
  styleUrls: ['./list-definitions.component.css']
})
export class ListDefinitionsComponent implements OnInit {


  m_definitions : definition[];

  constructor(private apiService : TermApiService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.getAllDefinitions();
  }


  
  onClickDefinitionLike(def : definition){
    def.likes++;

    this.apiService.updateDefinition(def).subscribe(()=>{});
  }


  getAllDefinitions() : void {
    this.apiService.getAllDefinitions().subscribe(definitions => ( this.m_definitions = definitions));
 }
}
