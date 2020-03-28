import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListTermEnglishComponent } from './list-term-english/list-term-english.component';
import { ListTermNonEnglishComponent } from './list-term-non-english/list-term-non-english.component';
import { ListDefinitionsComponent } from './list-definitions/list-definitions.component';
import { TermDetailsComponent } from './term-details/term-details.component';
import { TermEditComponent } from './term-edit/term-edit.component';


const routes: Routes = [

  {path : 'termEnglish',  component :ListTermEnglishComponent },
  {path : 'nonTermEnglish', component : ListTermNonEnglishComponent},
  {path : 'definitions', component : ListDefinitionsComponent},
  {path : 'details/:termType/:id', component : TermDetailsComponent},
  {path : 'edit/:termType/:id', component : TermEditComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
