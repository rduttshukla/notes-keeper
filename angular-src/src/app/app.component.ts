import { Component } from '@angular/core';
import { NotesApiService } from './notes-api.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'notes-keeper';
  notesList: Object;
  notesTitlesArray: Array<string> = [];
  notesDescriptionsArray: Array<string> = []  ;
  resultsArray: Array<string> = [];
  wordsArray: Array<string> = [];
  resultsNotesList: Array<object> = [];
  resultsContains: boolean = false;

  constructor(private notesApiService: NotesApiService) {

  }

  searchNotes(searchQuery) {
    this.resultsNotesList = [];
    this.notesApiService.listNote().subscribe(note => {
      this.notesList = note;
      for(let j = 0; j < Object.keys(this.notesList).length; j++ ) {
      //   this.notesTitlesArray.push(this.notesList[j].title);
      //   this.notesDescriptionsArray.push(this.notesList[j].description);
      //   for(let i = 0; i < this.notesTitlesArray.length; i++) {
      //     if(this.notesTitlesArray[i].includes(searchQuery) || this.notesDescriptionsArray[i].includes(searchQuery)) {
      //       this.resultsArray.push(this.notesList[j]._id);
      //     }
      //   }
      //   console.log(this.resultsArray);
          this.wordsArray = this.notesList[j].title.split(' ');
          for(let i = 0; i < this.wordsArray.length; i++) {
            if(searchQuery === this.wordsArray[i]) {
              this.resultsArray.push(this.notesList[j]._id);
              console.log(this.resultsArray);
          }
        }
      }
      for(let l = 0; l < this.resultsArray.length; l++) {
        this.notesApiService.getNoteById(this.resultsArray[l]).subscribe(note => {
        this.resultsNotesList.push(note);
        })
      }
      this.resultsContains = true;
      this.resultsArray = [];
    })
  }
}
