import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import {HEROES} from '../mock-heroes'



@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

    m_heroes : Hero[] = HEROES;
    m_selectedHero : Hero;

  constructor() { }

  ngOnInit() {
  }

  onSelect(hero : Hero) : void{
    console.log(hero);
    this.m_selectedHero = hero;
  }

}
