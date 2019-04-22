import React from 'react';
import {connect} from 'react-redux'
import {getSelectedBag} from '../store/bags'

export const SingleBag = (props) => {
  console.log(props, 'THIS IS PROPS')
  return (
    <div>
      <h1>The {props.singlebag.material} {props.singlebag.style}</h1>
      <h2>Your Color Selection:</h2>
        <ul>
          <li>{props.singlebag.stripeOneColor}</li>
          <li>{props.singlebag.stripeTwoColor}</li>
          <li>{props.singlebag.stripeThreeColor}</li>
        </ul>
      <h2>Description:</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum condimentum a massa id accumsan. Cras ut consectetur metus, et lacinia ante. Integer volutpat dapibus rhoncus. Morbi ac urna non lorem faucibus accumsan. Fusce luctus dapibus euismod. Cras ut leo quis lacus aliquet dictum.</p>
      <h2>Reviews:</h2>
    </div>
  )
}
const mapStateToProps = state => {
  return {
    singlebag: state.bags.selectedBag
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSelectedBag: (bag) => dispatch(getSelectedBag(bag))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleBag)

