import Categories from '../../data/Categories';

describe('Data class - Categories', () => {
  let categories;
  beforeEach(() => {
    categories = new Categories();
  });

  test('Should attr categories and observers be empty on start', () => {
    expect(categories.categories.length).toBe(0);
    expect(categories.observers.length).toBe(0);
  });

  test('Should be able to attach observers', () => {
    const observer = jest.fn();
    categories.attach(observer);
    expect(categories.observers.length).toBe(1);
    expect(categories.observers[0]).toBe(observer);
  });

  test('Should be able to detach observers', () => {
    const observer = jest.fn();
    categories.attach(observer);
    categories.detach(observer);
    expect(categories.observers.length).toBe(0);
  });

  test('Should be able to create categories', () => {
    const notifyFunc = (Categories.prototype._notify = jest.fn());
    categories.createCategory('Categoria 1');
    categories.createCategory('Categoria 2');
    expect(categories.categories.length).toBe(2);
    expect(notifyFunc).toHaveBeenCalledTimes(2);
  });

  test('Should be able to delete categories', () => {
    const notifyFunc = (Categories.prototype._notify = jest.fn());
    categories.createCategory('Categoria');
    categories.deleteCategory(0);
    expect(categories.categories.length).toBe(0);
    expect(notifyFunc).toHaveBeenCalledTimes(2);
  });
});
