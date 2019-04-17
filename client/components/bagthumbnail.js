import React from 'react'

const BagThumbnail = (props) => {
  return (
    <div>
      <h1>{props.style}</h1>
      <ul>
        <li>{props.color1}</li>
        <li>{props.color2}</li>
        <li>{props.color3}</li>
      </ul>
    </div>
  )
}

export default BagThumbnail
