export default class Categories {
  constructor() {
    this.categories = [];
    this.observers = [];
  }

  createCategory(category) {
    this.categories.push(category);
    this._notify();
  }

  deleteCategory(index) {
    this.categories.splice(index, 1);
    this._notify();
  }

  attach(observer) {
    this.observers.push(observer);
  }

  detach(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  _notify() {
    this.observers.forEach(observer => observer(this.categories));
  }
}
