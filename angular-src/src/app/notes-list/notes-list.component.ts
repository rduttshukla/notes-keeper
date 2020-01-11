import { Component, OnInit } from '@angular/core';
import { NotesApiService } from '../notes-api.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {
  notesList: Object;
  acknowledgement: any;
  editing: boolean;
  NoteData: Object = {
    _id: {type: String},
    title: {type: String},
    description: {type: String}
  }
  resultIds: Array<string> = [];
  resultIds2: Array<string> = [];
  resultNotesList: Array<object> = [];
  unionIds: Array<string> = [];
  searchQuery: string;
  resultsFound = false;
  constructor(private noteApiService: NotesApiService) { }

  ngOnInit() {
    console.log('initialized')
    this.noteApiService.listNote()
      .subscribe(note => {
        this.notesList = note
        if(this.isEmpty(this.notesList)) {
          this.notesList = null;
        }
        console.log(this.notesList)
      });
  }

  searchNotes(query) {
    this.resultIds2 = [];
    this.resultIds = [];
    this.unionIds = [];
    this.resultNotesList = [];
    this.searchQuery = query;
    this.resultsFound = false;
    // tslint:disable-next-line:label-position
    console.log('searching')
    for(let i = 0; i < Object.keys(this.notesList).length; i++) {
      if (this.notesList[i].title.includes(this.searchQuery)) {
        this.resultIds.push(this.notesList[i]._id);
      }
    }
    for(let i = 0; i < Object.keys(this.notesList).length; i++) {
      if(this.notesList[i].description.includes(this.searchQuery)) {
        this.resultIds2.push(this.notesList[i]._id);
      }
    }
    this.unionIds = [... new Set([...this.resultIds, ...this.resultIds2])];
    console.log(this.unionIds);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.unionIds.length; i++) {
      this.resultsFound = true;
      this.noteApiService.getNoteById(this.unionIds[i]).subscribe( note => {
        this.resultNotesList.push(note);
      });
    }
    console.log(this.resultNotesList);
  }

  listNotes() {
    this.noteApiService.listNote().subscribe(note => {
      this.notesList = note
      if(this.isEmpty(this.notesList)) {
        this.notesList = null;
      }
      console.log(this.notesList)
    })
  }

  isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}

  deleteNote(id) {
    this.noteApiService.deleteNote(id).subscribe(data => { this.listNotes() })
  }

  editNote(id) {
    this.noteApiService.editNote(id, this.NoteData).subscribe( data => { this.listNotes() })
    this.editing = false;
  }
  editNoteToggler(id) {
    this.editing = true;
  }

}
