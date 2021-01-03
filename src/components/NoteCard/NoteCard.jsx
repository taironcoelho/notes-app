import React, {Component} from 'react';
import './style.scss';
class NoteCard extends Component {
  render() {
    return (
      <section className="note-card">
        <header>
          <h3>{this.props.note.title}</h3>
        </header>
        <p>{this.props.note.text}</p>
      </section>
    );
  }
}

export default NoteCard;
