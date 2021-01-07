import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NotesForm from '../../../components/NotesForm';
import Categories from '../../../data/Categories';
jest.mock('../../../data/Categories');

beforeEach(() => {
  Categories.mockClear();
  Categories.mockImplementation(() => {
    return {
      categories: [],
      attach: jest.fn(),
      detach: jest.fn(),
    };
  });
});

describe('Components - NotesForm', () => {
  test('Form should be empty on start', () => {
    const {container} = render(<NotesForm categories={new Categories()} />);
    const form = container.querySelector('form');
    const title = container.querySelector('input[id="title"]');
    const text = container.querySelector('textarea');
    const button = container.querySelector('button[type="submit"]');

    expect(form).toBeTruthy();
    expect(title).toHaveValue('');
    expect(text).toHaveValue('');
    expect(button).toBeTruthy();
  });

  test('Should subscribe/unsubscribe to Categories when mount/unmount', () => {
    const mockCategoriesAttach = jest.fn();
    const mockCategorisDetach = jest.fn();
    Categories.mockImplementation(() => {
      return {
        categories: [],
        attach: mockCategoriesAttach,
        detach: mockCategorisDetach,
      };
    });

    const {unmount} = render(<NotesForm categories={new Categories()} />);

    expect(mockCategoriesAttach).toHaveBeenCalledTimes(1);
    unmount();
    expect(mockCategorisDetach).toHaveBeenCalledTimes(1);
  });

  test('Should render categories options', () => {
    Categories.mockImplementation(() => {
      return {
        categories: ['Category 1', 'Category 2'],
        attach: jest.fn(),
        detach: jest.fn(),
      };
    });

    render(<NotesForm categories={new Categories()} />);
    expect(
      screen.getByText('Not categorized', {selector: 'option'}),
    ).not.toBeNull();
    expect(screen.getByText('Category 1', {selector: 'option'})).not.toBeNull();
    expect(screen.getByText('Category 2', {selector: 'option'})).not.toBeNull();
  });

  test('Should be able to create a note without category', () => {
    const createNote = jest.fn();
    const {container} = render(
      <NotesForm createNote={createNote} categories={new Categories()} />,
    );
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

  test('Should be able to create a note with a category', () => {
    const createNote = jest.fn();
    const {container} = render(
      <NotesForm createNote={createNote} categories={new Categories()} />,
    );
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
