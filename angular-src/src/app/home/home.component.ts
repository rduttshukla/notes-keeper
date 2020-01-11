import { Component, OnInit } from '@angular/core';
import { NotesApiService } from '../notes-api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  notesList: object;
  message: object;

  constructor( private noteApiService: NotesApiService) { }

  ngOnInit() {
    
  }

  generateNote(title, body) {
    this.noteApiService.addNote(title, body).subscribe(message => {
      this.message = message;
      console.log(this.message);
    });
  }

}
