import React, {Component} from 'react';
import NotesList from './components/NotesList';
import NotesForm from './components/NotesForm';
import './App.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {
      notes: [],
    };

    this.createNote = this.createNote.bind(this);
  }

  createNote(note) {
    const notes = [...this.state.notes, note];
    this.setState({...this.state, notes: notes});
  }

  render() {
    return (
      <div className="content">
        <NotesForm createNote={this.createNote} />
        <NotesList notes={this.state.notes} />
      </div>
    );
  }
}

export default App;
