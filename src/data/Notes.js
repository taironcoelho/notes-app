import Note from './Note';

export default class Notes {
  constructor() {
    this.notes = [];
    this.observers = [];
  }

  createNote(note) {
    const newNote = new Note(note);
    this.notes.push(newNote);
    this._notify();
  }

  deleteNote(index) {
    this.notes.splice(index, 1);
    this._notify();
  }

  attach(observer) {
    this.observers.push(observer);
  }

  detach(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  _notify() {
    this.observers.forEach(observer => observer(this.notes));
  }
}
