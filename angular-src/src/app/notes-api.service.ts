import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError, pipe } from 'rxjs';
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class NotesApiService {
  baseUrl: string = "http://localhost:3000/api/notes/"
  Note: Object = {
    title: {type: String},
    description: {type: String}
  }
  editing: boolean = false;

  constructor(private http: HttpClient) { }

  addNote(title, body): Observable<object> {
    this.Note.title = title;
    this.Note.description = body;
    return this.http.post(this.baseUrl, this.Note, { responseType: 'arraybuffer'}).pipe(catchError(this.errorHandler));
  }

  deleteNote(id) {
    return this.http.delete(this.baseUrl + id, {responseType: 'text'}).pipe(catchError(this.errorHandler));
  }

  editNote(id, newNote) {
    console.log(newNote)
    return this.http.put(this.baseUrl + id, newNote, {responseType: 'text'}).pipe(catchError(this.errorHandler));
  }

  listNote(): Observable<object> {
    return this.http.get(this.baseUrl).pipe(catchError(this.errorHandler));
  }

  getNoteById(id): Observable<object> {
    return this.http.get(this.baseUrl + id).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || "Server error");
  }
}
