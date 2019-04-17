import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import BagThumbnail from './bagthumbnail'
import Axios from 'axios';

class AllBackpacks extends React.Component {
  constructor(props) {
    super(props)
    this.state = { bags: [] };
  }
  async componentDidMount() {
    const getBags = await Axios.get(`/api/bags/Backpack`)
    this.setState({ bags: getBags.data })
    console.log(this.state, "getBags in componenet did mount")
  }
  render(){
    const noBags = <div>No Bags Here</div>
    const thereAreBags = <div>
      {this.state.bags.map(bag => (
        <div id={bag.id}>
          <BagThumbnail style={bag.style} color1={bag.stripeOneColor} color2={bag.stripeTwoColor} color3={bag.stripeThreeColor} />
          </div>
      ))}
    </div>

    return (this.state.bags.length ? thereAreBags : noBags)
  }
}
export default AllBackpacks


