import React, {Component} from 'react';
import NotesList from './components/NotesList';
import NotesForm from './components/NotesForm';
import './App.scss';
import Notes from './data/Notes';

class App extends Component {
  constructor() {
    super();
    this.notes = new Notes();
    this.notes.createNote = this.notes.createNote.bind(this.notes);
    this.notes.deleteNote = this.notes.deleteNote.bind(this.notes);
  }

  render() {
    return (
      <div className="content">
        <NotesForm createNote={this.notes.createNote} />
        <NotesList notes={this.notes} deleteNote={this.notes.deleteNote} />
      </div>
    );
  }
}

export default App;
