import React from 'react';
import { Panel } from 'react-bootstrap';
import ProductTable from './ProductTable.jsx';
import graphQLFetch from './graphQLFetch.js';
import Toast from './Toast.jsx';

export default class ProductList extends React.Component {
  constructor() {
    super();
    // assigning an empty array to the products state variable.
    this.state = {
      products: [],
      toastVisible: false,
      toastMessage: '',
      toastType: 'info',
    };
    /* bind() method helps in passing eventhandlers and
other functions as props to the child component. */
    this.deleteProduct = this.deleteProduct.bind(this);
    this.showSuccess = this.showSuccess.bind(this);
    this.showError = this.showError.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    this.loadCount();
    // constructing a GraphQL query
    const query = `query{
      productList{
        id productname price 
        category image

      }
    }`;

    const data = await graphQLFetch(query, this.showError);
    if (data) {
      this.setState({ products: data.productList });
    }
  }

  async loadCount() {
    const query = `query {
      productCount
    }`;
    const data = await graphQLFetch(query, this.showError);
    if (data) {
      this.setState({ count: data.productCount });
    }
  }


  async deleteProduct(index) {
    const query = `mutation productDelete($id: Int!) {
      productDelete(id: $id)
    }`;
    const { products } = this.state;
    const { location: { pathname, search }, history } = this.props;
    const { id } = products[index];
    const data = await graphQLFetch(query, { id }, this.showError);
    if (data && data.productDelete) {
      this.setState((prevState) => {
        const newList = [...prevState.products];
        if (pathname === `/products/${id}`) {
          history.push({ pathname: '/products', search });
        }
        newList.splice(index, 1);
        return { products: newList };
      });
      this.showSuccess(`Deleted product ${id} successfully.`);
    } else {
      this.loadData();
    }
    this.loadCount();
  }

  showSuccess(message) {
    this.setState({
      toastVisible: true, toastMessage: message, toastType: 'success',
    });
  }

  showError(message) {
    this.setState({
      toastVisible: true, toastMessage: message, toastType: 'danger',
    });
  }

  dismissToast() {
    this.setState({ toastVisible: false });
  }

  render() {
    const { products, count } = this.state;
    const { toastVisible, toastType, toastMessage } = this.state;
    return (
      <>
        <panel>
          <Panel.Heading>
            <Panel.Title toggle>
              Showing
              {count}
              {' '}
              available products
            </Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <ProductTable products={products} deleteProduct={this.deleteProduct} />
          </Panel.Body>
        </panel>
        <Toast
          showing={toastVisible}
          onDismiss={this.dismissToast}
          bsStyle={toastType}
        >
          {toastMessage}
        </Toast>
      </>
    );
  }
}
