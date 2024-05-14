import { Component,Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  @Output() searchQueryChange = new EventEmitter<string[]>();
@Output() searchQueryText = new EventEmitter<string>();
titleQuery: string = '';
locationQuery: string = '';
  // Method to emit search query changes

  ButtonSearch(){
    console.log('Search Query:', this.titleQuery);
    this.searchQueryChange.emit([this.titleQuery,this.locationQuery] );
   // this.searchQueryText.emit(this.locationQuery );

  }
}
