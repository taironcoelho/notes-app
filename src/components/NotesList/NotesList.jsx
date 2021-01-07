import React, {Component} from 'react';
import NoteCard from '../NoteCard/NoteCard';
import './style.scss';

export default class NotesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
    };
    this._updateNotes = this._updateNotes.bind(this);
  }

  componentDidMount() {
    this.setState({...this.state, notes: this.props.notes.notes});
    this.props.notes.attach(this._updateNotes);
  }

  componentWillUnmount() {
    this.props.notes.detach(this._updateNotes);
  }

  _updateNotes(notes) {
    this.setState({...this.state, notes});
  }

  render() {
    return (
      <ul className="notes-list">
        {this.state.notes.map((note, index) => {
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
