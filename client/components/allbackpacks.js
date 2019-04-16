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
    console.log("IN COMPONENT DID MOUNT")
    const getBags = await Axios.get(`/api/bags/Backpack`)
    console.log(getBags)
    this.setState({ bags: getBags })
  }
  render() {
    console.log("WE ARE IN ALL BACKPACKS")
    return (
      <div>
        {this.state.bags.map(backpack => (
          <BagThumbnail key={backpack.id} style={backpack.style}
           color1={backpack.stripeOneColor}
           color2={backpack.stripeTwoColor}
           color3={backpack.stripeThreeColor} />
        ))};

      )
      </div>
    )
  }
}
export default AllBackpacks


