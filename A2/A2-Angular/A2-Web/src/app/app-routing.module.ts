import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListTermEnglishComponent } from './list-term-english/list-term-english.component';
import { ListTermNonEnglishComponent } from './list-term-non-english/list-term-non-english.component';
import { ListDefinitionsComponent } from './list-definitions/list-definitions.component';
import { TermDetailsComponent } from './term-details/term-details.component';
import { TermEditComponent } from './term-edit/term-edit.component';
import { TermEnglishCreateComponent } from './term-english-create/term-english-create.component';
import { TermNonEnglishCreateComponent } from './term-non-english-create/term-non-english-create.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DefinitionCreateComponent } from './definition-create/definition-create.component';
import { DefinitionEditComponent } from './definition-edit/definition-edit.component';



const routes: Routes = [
  {path : '',  component : HomepageComponent },
  {path : 'termEnglish',  component :ListTermEnglishComponent },
  {path : 'termNonEnglish', component : ListTermNonEnglishComponent},
  {path : 'definitions', component : ListDefinitionsComponent},
  
  {path : 'create/termEnglish', component : TermEnglishCreateComponent},
  {path: 'create/termNonEnglish', component:TermNonEnglishCreateComponent},
  {path : 'edit/definition/:id', component :DefinitionEditComponent},
  {path : 'details/:termType/:id', component : TermDetailsComponent},
  {path : 'edit/:termType/:id', component : TermEditComponent},

  {path : 'create/definition/:termType', component :DefinitionCreateComponent},
  {path : 'create/definition/:termType/:id', component :DefinitionCreateComponent}


  

 
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
