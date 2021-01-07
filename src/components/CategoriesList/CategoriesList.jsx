import React, {Component} from 'react';
import './style.scss';

export default class CategoriesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      category: '',
    };

    this._updateCategories = this._updateCategories.bind(this);
    this._handleInputChange = this._handleInputChange.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  componentDidMount() {
    this.setState(this.props.categories);
    this.props.categories.attach(this._updateCategories);
  }

  componentWillUnmount() {
    this.props.categories.detach(this._updateCategories);
  }

  _updateCategories(categories) {
    this.setState({...this.state, categories});
  }

  _handleInputChange(event) {
    this.setState({...this.state, category: event.target.value});
  }

  _handleFormSubmit(event) {
    this._handleEventDispatch(event);
    this.props.createCategory(this.state.category);
    this._resetForm();
  }

  _handleEventDispatch(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  _resetForm() {
    this.setState({...this.state, category: ''});
  }

  render() {
    return (
      <section className="categories-list">
        <ul>
          {this.state.categories.map((category, index) => {
            return <li key={index}>{category}</li>;
          })}
        </ul>
        <form onSubmit={this._handleFormSubmit}>
          <input
            value={this.state.category}
            onChange={this._handleInputChange}
            type="text"
            placeholder="Adicionar Categoria"
          />
        </form>
      </section>
    );
  }
}
