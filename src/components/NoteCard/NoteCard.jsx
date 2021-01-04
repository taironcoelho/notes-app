import React, {Component} from 'react';
import {ReactComponent as DeleteIconSVG} from '../../assets/images/delete-icon.svg';
import './style.scss';
class NoteCard extends Component {
  constructor(props) {
    super(props);
    this._deleteNote = this._deleteNote.bind(this);
  }
  _deleteNote() {
    this.props.deleteNote(this.props.index);
  }

  render() {
    return (
      <section className="note-card">
        <header>
          <h3>{this.props.note.title}</h3>
          <DeleteIconSVG onClick={this._deleteNote} data-testid="delete-icon" />
        </header>
        <p>{this.props.note.text}</p>
      </section>
    );
  }
}

export default NoteCard;
