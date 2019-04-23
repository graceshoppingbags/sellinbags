import React from 'react'
import SingleOrder from './singleorder'


const Orders = (props) => {
    return (
        <div>
            {props.orders.map(order => {
                return (<div key={order.id}>
                            <SingleOrder order={order}/>
                        </div>
                    )
                }   
            )}
        </div>
    )
}

export default Orders