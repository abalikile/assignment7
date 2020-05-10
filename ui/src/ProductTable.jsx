import React from 'react';
import { withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Button, Glyphicon, Tooltip, OverlayTrigger, Table,
} from 'react-bootstrap';

const ProductRow = withRouter(({
  product, deleteProduct, index,
}) => {
  const editTooltip = (
    <Tooltip id="close-tooltip" placement="top">Edit Product</Tooltip>
  );
  const imageTooltip = (
    <Tooltip id="image-tooltip" placement="top">View Image</Tooltip>
  );
  const deleteTooltip = (
    <Tooltip id="delete-tooltip" placement="top">Delete Product</Tooltip>
  );

  function onDelete(e) {
    e.preventDefault();
    deleteProduct(index);
  }
  return (
    <tr>
      <td>{product.productname}</td>
      <td>
        $
        {product.price}
      </td>
      <td>{product.category}</td>
      <td>
        <LinkContainer to={`/view/${product.id}`}>
          <OverlayTrigger delayShow={1000} overlay={imageTooltip}>
            <Button bsSize="xsmall">
              <Glyphicon glyph="picture" />
            </Button>
          </OverlayTrigger>
        </LinkContainer>

      </td>
      <td>
        <LinkContainer to={`/edit/${product.id}`}>
          <OverlayTrigger delayShow={1000} overlay={editTooltip}>
            <Button bsSize="xsmall">
              <Glyphicon glyph="edit" />
            </Button>
          </OverlayTrigger>
        </LinkContainer>
        {' '}

        <OverlayTrigger delayShow={1000} overlay={deleteTooltip}>
          <Button bsSize="xsmall" onClick={onDelete}>
            <Glyphicon glyph="trash" />
          </Button>
        </OverlayTrigger>
      </td>
    </tr>
  );
});

export default function ProductTable({ products, deleteProduct }) {
  const productRows = products.map((product, index) => (
    // id is taken as key value which uniquely identifies a row.
    <ProductRow key={product.id} product={product} deleteProduct={deleteProduct} index={index} />
  ));
  return (
    <Table bordered condensed hover responsive>
      <thead>
        <tr>
          <th className="color1">Product Name</th>
          <th className="color2">Price</th>
          <th className="color1">Category</th>
          <th className="color2">Image</th>
          <th className="color1">Action</th>
        </tr>
      </thead>
      <tbody>
        {productRows}
      </tbody>
    </Table>
  );
}
