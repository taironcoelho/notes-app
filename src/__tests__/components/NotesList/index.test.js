import NotesList from '../../../components/NotesList';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Notes from '../../../data/Notes';
jest.mock('../../../data/Notes');

beforeEach(() => {
  Notes.mockClear();
});

describe('Components - NotesList', () => {
  test('Should be empty on start', () => {
    const {container} = render(<NotesList notes={new Notes()} />);
    expect(container.firstChild).toBeEmptyDOMElement();
  });

  test('Should render correctly when it receive Notes', () => {
    Notes.mockImplementation(() => {
      return {
        notes: [
          {title: 'Note 1', text: 'Description of Note 1'},
          {title: 'Note 2', text: 'Description of Note 2'},
        ],
        attach: () => {},
        detach: () => {},
      };
    });

    const notes = new Notes();
    const {container, queryByText} = render(<NotesList notes={notes} />);

    expect(container.firstChild.children).toHaveLength(2);
    expect(queryByText('Note 1')).not.toBeNull();
    expect(queryByText('Description of Note 1')).not.toBeNull();
    expect(queryByText('Note 2')).not.toBeNull();
    expect(queryByText('Description of Note 2')).not.toBeNull();
  });

  test('Should subscribe/unsubscribe to Notes when mount/unmount', () => {
    const mockNotesAttach = jest.fn();
    const mockNotesDetach = jest.fn();
    Notes.mockImplementation(() => {
      return {
        notes: [],
        attach: mockNotesAttach,
        detach: mockNotesDetach,
      };
    });

    const notes = new Notes();
    const {unmount} = render(<NotesList notes={notes} />);

    expect(mockNotesAttach).toHaveBeenCalledTimes(1);
    unmount();
    expect(mockNotesDetach).toHaveBeenCalledTimes(1);
  });
});
