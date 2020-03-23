import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListTermEnglishComponent } from './list-term-english/list-term-english.component';
import { ListTermNonEnglishComponent } from './list-term-non-english/list-term-non-english.component';
import { ListDefinitionsComponent } from './list-definitions/list-definitions.component';


const routes: Routes = [

  {path : 'termEnglish',  component :ListTermEnglishComponent },
  {path : 'nonTermEnglish', component : ListTermNonEnglishComponent},
  {path : 'definitions', component : ListDefinitionsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
