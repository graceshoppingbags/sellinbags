import React from 'react'


const WishList = (props) => {
    console.log(props)
    return (
        <div>
            {props.wishlist.map(wish => {
                let bag = wish.bag
                return (<div key={wish.id}>
                            <div>{bag.style}</div>
                            <ul>
                                <li>{bag.stripeOneColor}</li>
                                <li>{bag.stripeTwoColor}</li>
                                <li>{bag.stripeThreeColor}</li>
                            </ul>
                            <div>Added: {wish.createdAt}</div>
                        </div>
                    )
                }   
            )}
        </div>
    )
    
}

export default WishList