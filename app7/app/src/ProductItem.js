import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import './ProductItem.css'
import { Link } from 'react-router-dom'
import { removeProduct, productVote } from './modules/products'

class ProductItem extends Component {
  render() {
    const { name } = this.props.product
    return <div className='product-item'>
      <div className='voting'>
        <div className='count'>
          {this.props.voteCount}
        </div>
        <div className='buttons'>
          <div className='up' onClick={() => this.props.productVote(name, true)}>&#9650;</div>
          <div className='down' onClick={() => this.props.productVote(name, false)}>&#9660;</div>
        </div>
      </div>
      <div className='name'>
        <Link to={'/products/' + name}>{name}</Link>
      </div>
      <div
        className='product-item-remove'
        onClick={() => this.props.removeProduct(name)}>x</div>
    </div>
  }
}

const mapStateToProps = (state, ownProps) => ({
  voteCount: state.products.votes[ownProps.product.name]
})

const mapDispatchToProps = dispatch => bindActionCreators({
  removeProduct,
  productVote
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem)