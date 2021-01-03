import NotesForm from '../../../components/NotesForm';
import {fireEvent, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Components - NotesList', () => {
  test('Form should be empty on start', () => {
    const {container} = render(<NotesForm />);
    const form = container.querySelector('form');
    const title = container.querySelector('input[id="title"]');
    const text = container.querySelector('textarea');
    const button = container.querySelector('button[type="submit"]');

    expect(form).toBeTruthy();
    expect(title).toHaveValue('');
    expect(text).toHaveValue('');
    expect(button).toBeTruthy();
  });

  test('Should be able to create a note', () => {
    const createNote = jest.fn();
    const {container} = render(<NotesForm createNote={createNote} />);
    const button = container.querySelector('button[type="submit"]');
    const title = container.querySelector('input[id="title"]');
    const text = container.querySelector('textarea');

    fireEvent.change(title, {
      target: {
        value: 'Some title',
      },
    });
    fireEvent.change(text, {
      target: {
        value: 'Some text',
      },
    });
    expect(title).toHaveValue('Some title');
    expect(text).toHaveValue('Some text');

    button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    expect(createNote).toHaveBeenCalledTimes(1);
    expect(title).toHaveValue('');
    expect(text).toHaveValue('');
  });
});
