import React from 'react'
import SingleWish from './singlewish'

const WishList = (props) => {
    return (
        props.wishlist ?
        <div>
            {props.wishlist.map(wish => {
                // let bag = wish.bag
                return (<div key={wish.id}>
                            {/* <div>{bag.style}</div>
                            <ul>
                                <li>{bag.stripeOneColor}</li>
                                <li>{bag.stripeTwoColor}</li>
                                <li>{bag.stripeThreeColor}</li>
                            </ul>
                            <div>Added: {wish.createdAt}</div> */}
                            <SingleWish wish={wish}/>
                        </div>
                    )
                }   
            )}
        </div> :
        <div></div>
    )
    
}

export default WishList