import CategoriesList from '../../../components/CategoriesList';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
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

describe('Components - CategoriesList', () => {
  test('Should be empty on start', () => {
    const {container} = render(
      <CategoriesList categories={new Categories()} />,
    );
    expect(container.querySelector('ul')).toBeEmptyDOMElement();
  });

  test('Should render correctly when it receive Categories', () => {
    Categories.mockImplementation(() => {
      return {
        categories: ['Category 1', 'Category 2'],
        attach: jest.fn(),
        detach: jest.fn(),
      };
    });

    const categories = new Categories();
    const {container, queryByText} = render(
      <CategoriesList categories={categories} />,
    );

    expect(container.firstChild.children).toHaveLength(2);
    expect(queryByText('Category 1')).not.toBeNull();
    expect(queryByText('Category 2')).not.toBeNull();
  });

  test('Should be able to create a category', () => {
    const mockCategoriesCreateCategory = jest.fn();
    Categories.mockImplementation(() => {
      return {
        categories: [],
        attach: jest.fn(),
        detach: jest.fn(),
        createCategory: mockCategoriesCreateCategory,
      };
    });

    const categories = new Categories();
    const {container} = render(
      <CategoriesList
        createCategory={categories.createCategory}
        categories={categories}
      />,
    );
    const categoryInput = container.querySelector('input');
    const form = container.querySelector('form');
    fireEvent.change(categoryInput, {
      target: {
        value: 'Some category',
      },
    });

    fireEvent.submit(form);
    expect(mockCategoriesCreateCategory).toHaveBeenCalledTimes(1);
    expect(categoryInput).toHaveValue('');
  });

  test('Should subscribe/unsubscribe to Categories when mount/unmount', () => {
    const mockCategoriesAttach = jest.fn();
    const mockCategoriesDetach = jest.fn();
    Categories.mockImplementation(() => {
      return {
        categories: [],
        attach: mockCategoriesAttach,
        detach: mockCategoriesDetach,
      };
    });

    const categories = new Categories();
    const {unmount} = render(<CategoriesList categories={categories} />);

    expect(mockCategoriesAttach).toHaveBeenCalledTimes(1);
    unmount();
    expect(mockCategoriesDetach).toHaveBeenCalledTimes(1);
  });
});
