import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton=({price})=>{
         const priceForStripe= price*100;
         const publishableKey ='pk_test_51HjS5CGFVR6blC3RE96iFapui4zIC51QhyR5eNW81E8UkFgbFicsAaieqlmbEZqph2LA3hFz9DnQ5JaUGjFPW8oU00b5nwdtLK';
const ontoken = token =>{
    console.log(token);
    alert('Payment Successfull');
}
         
         return(
             <StripeCheckout
             label='Pay Now'
             name='Crown Clothing'
             billingAddress
             shippingAddress
             currency="INR"
             image='https://sendeyo.com/up/d/f3eb2117da'
             description={`Your total price is Rs ${price}`}
             amount={priceForStripe}
             panelLabel='Pay Now'
             token={ontoken}
             stripeKey={publishableKey}
             ></StripeCheckout>
         );
};

export default StripeCheckoutButton;