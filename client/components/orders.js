import React from 'react'
import SingleOrder from './singleorder'


const Orders = (props) => {
    return (
        props.orders ? 
        <div>
            {props.orders.map(order => {
                return (<div key={order.id}>
                            <SingleOrder order={order}/>
                        </div>
                    )
                }   
            )}
        </div> :
        <div></div>
    )
}

export default Orders