import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

// eslint-disable-next-line
function StripeCheckOutButton(props) {
    const priceForStripe = props.price*100;
    const publishableKey = "pk_test_7JVYiEe3si6bekwA2ntQFti400iZPKw9gs";


    return (
        <StripeCheckout
            currency="INR"
            amout={priceForStripe}
            style={{backgroundColor : "red"}}
            label={`Pay ₹${priceForStripe/100} with card`}
            name="CCMS"
            description={`Your Total Bill amout is ${props.price}`}
            panelLabel="Pay Now"
            token={(token) => props.onToken(priceForStripe,token)}
            stripeKey ={publishableKey}
        />
    ) 
}

export default StripeCheckOutButton;