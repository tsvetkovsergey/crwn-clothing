// stripe-button.component.jsx
import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  // Stripe needs price in cents
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51JnjCkIedmVrJdJjCkSfXd40KqokWcFdn1LPRU5WYx2pRrh3HBZ1ClmxoG0znGZgY1AO02wBZiXMGB3xmKYtAVrO00Bt3wfVki";

  const onToken = (token) => {
    // Pass token to your backend which then creates the charge
    console.log(token);
    alert("Payment Successful");
  };
  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
