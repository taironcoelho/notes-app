import NoteCard from '../../../components/NoteCard';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Components - NoteCard', () => {
  test('Should render correctly when it receive a note', () => {
    const note = {title: 'Note 1', text: 'Description of Note 1'};
    const {queryByText} = render(<NoteCard note={note} />);

    expect(queryByText('Note 1')).not.toBeNull();
    expect(queryByText('Description of Note 1')).not.toBeNull();
  });
});
