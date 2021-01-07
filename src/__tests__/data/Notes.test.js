import Notes from '../../data/Notes';

describe('Data class - Notes', () => {
  let notes;
  beforeEach(() => {
    notes = new Notes();
  });

  test('Should attr notes and observers be empty on start', () => {
    expect(notes.notes.length).toBe(0);
    expect(notes.observers.length).toBe(0);
  });

  test('Should be able to attach observers', () => {
    const observer = jest.fn();
    notes.attach(observer);
    expect(notes.observers.length).toBe(1);
    expect(notes.observers[0]).toBe(observer);
  });

  test('Should be able to detach observers', () => {
    const observer = jest.fn();
    notes.attach(observer);
    notes.detach(observer);
    expect(notes.observers.length).toBe(0);
  });

  test('Should be able to create notes', () => {
    const notifyFunc = (Notes.prototype._notify = jest.fn());
    notes.createNote('Note title', 'Note description');
    notes.createNote('Note title 2', 'Note description 2');
    expect(notes.notes.length).toBe(2);
    expect(notifyFunc).toHaveBeenCalledTimes(2);
  });

  test('Should be able to delete notes', () => {
    const notifyFunc = (Notes.prototype._notify = jest.fn());
    notes.createNote('Note title', 'Note description');
    notes.deleteNote(0);
    expect(notes.notes.length).toBe(0);
    expect(notifyFunc).toHaveBeenCalledTimes(2);
  });
});
