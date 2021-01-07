export default class Notes {
  constructor() {
    this.notes = [];
    this.observers = [];
  }

  createNote(title, text, category) {
    const newNote = new Note(title, text, category);
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

class Note {
  constructor(title, text, category) {
    this.title = title;
    this.text = text;
    this.category = category;
  }
}
