import React, {Component} from 'react';
import NoteCard from '../NoteCard/NoteCard';
import './style.scss';

export default class NotesList extends Component {
  render() {
    return (
      <ul className="notes-list">
        {this.props.notes.map((note, index) => {
          return (
            <li className="notes-list__item" key={index}>
              <NoteCard
                note={note}
                index={index}
                deleteNote={this.props.deleteNote}
              />
            </li>
          );
        })}
      </ul>
    );
  }
}
