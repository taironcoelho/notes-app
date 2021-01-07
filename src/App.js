import React, {Component} from 'react';
import NotesList from './components/NotesList';
import NotesForm from './components/NotesForm';
import CategoriesList from './components/CategoriesList';
import Notes from './data/Notes';
import Categories from './data/Categories';
import './App.scss';

class App extends Component {
  constructor() {
    super();
    this.notes = new Notes();
    this.categories = new Categories();

    this.notes.createNote = this.notes.createNote.bind(this.notes);
    this.notes.deleteNote = this.notes.deleteNote.bind(this.notes);
    this.categories.createCategory = this.categories.createCategory.bind(
      this.categories,
    );
  }

  render() {
    return (
      <div className="content">
        <NotesForm
          createNote={this.notes.createNote}
          categories={this.categories}
        />
        <main>
          <CategoriesList
            categories={this.categories}
            createCategory={this.categories.createCategory}
          />
          <NotesList notes={this.notes} deleteNote={this.notes.deleteNote} />
        </main>
      </div>
    );
  }
}

export default App;
