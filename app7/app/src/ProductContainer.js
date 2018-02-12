import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import './ProductContainer.css'
import Product from './Product.js'
import { removeProduct } from './modules/products'

class ProductContainer extends Component {

  renderProduct(){
    if(!this.props.selectedProduct)
      return <div className='product-header'>{this.props.requestedProductName} does not exist</div>

    return <div>
        <div className='product-header'>
        <button className='remove-product' onClick={() => this.props.removeProduct(this.props.selectedProduct.name)}>
          Delete
        </button>
      </div>
      {this.props.selectedProduct && <Product product={this.props.selectedProduct} />}
      <div className='vote-count'>
        Vote count: {this.props.voteCount || 0}
      </div>
    </div>
    
  }

  render() {
    const { selectedProduct } = this.props
    return <div className='product-container'>
      { this.renderProduct() }
    </div>
  }
}

const mapStateToProps = (state, ownProps) => ({
  selectedProduct: state.products.products && state.products.products.find(p => p.name === ownProps.match.params.productName),
  requestedProductName: ownProps.match.params.productName,
  voteCount: state.products.votes[ownProps.match.params.productName]
})

const mapDispatchToProps = dispatch => bindActionCreators({
  removeProduct
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ProductContainer)