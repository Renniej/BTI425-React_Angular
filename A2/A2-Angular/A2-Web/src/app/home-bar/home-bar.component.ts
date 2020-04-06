import { Component, OnInit } from '@angular/core';
import { SharedSearchTextService } from '../shared-search-text.service';
import { Router , NavigationStart} from '@angular/router';


@Component({
  selector: 'home-bar',
  templateUrl: './home-bar.component.html',
  styleUrls: ['./home-bar.component.css']
})
export class HomeBarComponent implements OnInit {

  searchButtonEnabled = false;
  searchText : string;

  constructor(private sharedSearchText : SharedSearchTextService, private router : Router) { 

    router.events.forEach((event) => {
      if(event instanceof NavigationStart) {
      }
        this.searchText = '';
        this.sharedSearchText.textChanged(this.searchText);

        if (this.router.url === "/termEnglish" || this.router.url === "/termNonEnglish"){
          this.searchButtonEnabled = true;
        }
        else{
          this.searchButtonEnabled = false;
        }

    });
    
  }

  ngOnInit(): void {
    this.sharedSearchText.sharedSearchText.subscribe(text => this.searchText = text);
  }

  onSearchSubmitClick(){
    console.log("test");
    this.sharedSearchText.textChanged(this.searchText);
  }

}
