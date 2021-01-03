import React, {Component} from 'react';
import './style.scss';

export default class NotesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: '',
    };

    this._handleInputChange = this._handleInputChange.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._createNote = this._createNote.bind(this);
  }

  _handleInputChange(target, value) {
    const newState = {...this.state, [target]: value};
    this.setState(newState);
  }

  _handleFormSubmit(event) {
    this._handleEventDispatch(event);
    this._createNote();
    this._resetForm();
  }

  _handleEventDispatch(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  _createNote() {
    this.props.createNote(this.state);
  }

  _resetForm() {
    this.setState({title: '', text: ''});
  }

  render() {
    return (
      <form className="notes-form" onSubmit={this._handleFormSubmit}>
        <input
          id="title"
          className="notes-form__input"
          value={this.state.title}
          onChange={e => this._handleInputChange('title', e.target.value)}
          type="text"
          placeholder="Title"
        />
        <textarea
          id="text"
          className="notes-form__input"
          value={this.state.text}
          onChange={e => this._handleInputChange('text', e.target.value)}
          rows={15}
          placeholder="Insert your note..."
        />
        <button type="submit" className="notes-form__input notes-form__submit">
          Send
        </button>
      </form>
    );
  }
}
