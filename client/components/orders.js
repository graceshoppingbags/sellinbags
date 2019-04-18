import React from 'react'


const Orders = (props) => {
    console.log(props.orders[0])
    return (
        <div>
            {props.orders.map(order => {
                let bag = order.orderproducts[0].bag
                return (<div key={order.id}>
                            <div>{bag.style}</div>
                            <ul>
                                <li>{bag.stripeOneColor}</li>
                                <li>{bag.stripeTwoColor}</li>
                                <li>{bag.stripeThreeColor}</li>
                            </ul>
                        </div>
                    )
                }   
            )}
        </div>
    )
    
}

export default Orders