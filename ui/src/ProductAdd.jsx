import React from 'react';
import PropTypes from 'prop-types';
import {
  Form, FormControl, FormGroup, ControlLabel, Button,
} from 'react-bootstrap';

export default class ProductAdd extends React.Component {
  constructor() {
    super();
    // pre-populating the $ symbol
    this.state = { value: '$' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  // To read the price value using onChange.
  handleChange(e) {
    this.setState({ value: e.target.reset });
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.productAdd;

    const product = {
      productname: form.productname.value,
      price: form.price.value,
      category: form.category.value,
      image: form.image.value,
    };
    const { createProduct } = this.props;
    createProduct(product);
    form.productname.value = ''; form.price.value = '$'; form.category.value = 'Shirts'; form.image.value = '';
  }

  render() {
    return (
      <Form inline name="productAdd" onSubmit={this.handleSubmit}>
        <FormGroup>
          <ControlLabel>
            Category
            <br />
            <FormControl componentClass="select" name="category" id="category">
              <option value="Shirts">Shirts</option>
              <option value="Jeans">Jeans</option>
              <option value="Jackets">Jackets</option>
              <option value="Sweaters">Sweaters</option>
              <option value="Accessories">Accessories</option>
            </FormControl>
          </ControlLabel>
        </FormGroup>
        {' '}

        <FormGroup>
          <ControlLabel>
            Price Per Unit
            <br />
            <FormControl name="price" id="price" type="text" onChange={this.handleChange} value={this.state.value} />
          </ControlLabel>
        </FormGroup>
        {' '}

        <FormGroup>
          <ControlLabel>
            ProductName
            <br />
            <FormControl type="text" name="productname" />
          </ControlLabel>
        </FormGroup>
        {' '}

        <FormGroup>
          <ControlLabel>
            Image Url
            <br />
            <FormControl type="url" name="image" />
          </ControlLabel>
        </FormGroup>
        {' '}
        <Button type="submit" bsStyle="primary">Add Product</Button>
      </Form>
    );
  }
}

ProductAdd.propTypes = {
  createProduct: PropTypes.func.isRequired,
};
