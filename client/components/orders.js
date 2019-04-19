import React from 'react'
import SingleOrder from './singleorder'


const Orders = (props) => {
    return (
        <div>
            {props.orders.map(order => {
                // let bag = order.orderproducts[0].bag
                return (<div key={order.id}>
                            {/* <div>{bag.style}</div>
                            <ul>
                                <li>{bag.stripeOneColor}</li>
                                <li>{bag.stripeTwoColor}</li>
                                <li>{bag.stripeThreeColor}</li>
                            </ul>
                            <div>
                                Added: {order.createdAt}
                            </div> */}
                            <SingleOrder order={order}/>
                        </div>
                    )
                }   
            )}
        </div>
    )
    
}

export default Orders