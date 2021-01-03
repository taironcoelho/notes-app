import NotesList from '../../../components/NotesList';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Components - NotesList', () => {
  test('Should be empty on start', () => {
    const {container} = render(<NotesList notes={[]} />);
    expect(container.firstChild).toBeEmptyDOMElement();
  });

  test('Should render correctly when it has Notes', () => {
    const notes = [
      {title: 'Note 1', text: 'Description of Note 1'},
      {title: 'Note 2', text: 'Description of Note 2'},
    ];
    const {container, queryByText} = render(<NotesList notes={notes} />);

    expect(container.firstChild.children).toHaveLength(2);
    expect(queryByText('Note 1')).not.toBeNull();
    expect(queryByText('Description of Note 1')).not.toBeNull();
    expect(queryByText('Note 2')).not.toBeNull();
    expect(queryByText('Description of Note 2')).not.toBeNull();
  });
});
