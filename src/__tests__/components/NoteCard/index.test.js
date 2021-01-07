import NoteCard from '../../../components/NoteCard';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Components - NoteCard', () => {
  const note = {
    title: 'Note 1',
    text: 'Description of Note 1',
    category: 'Category',
  };

  test('Should render correctly when it receive a note', () => {
    const {queryByText, queryByTestId} = render(<NoteCard note={note} />);

    expect(queryByText('Note 1')).not.toBeNull();
    expect(queryByText('Description of Note 1')).not.toBeNull();
    expect(queryByText('Category')).not.toBeNull();
    expect(queryByTestId('delete-icon')).not.toBeNull();
  });

  test('Call delete function on delete icon click', () => {
    const deleteNote = jest.fn();
    const {queryByTestId} = render(
      <NoteCard note={note} deleteNote={deleteNote} />,
    );
    const deleteIcon = queryByTestId('delete-icon');

    deleteIcon.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    expect(deleteNote).toHaveBeenCalledTimes(1);
  });
});
