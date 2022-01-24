import React from "react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
const Checkout = ({ pub_key }) => {
  const config = {
    public_key: pub_key,
    tx_ref: Date.now(),
    amount: 100,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    redirect_url: "https://upayroll.vercel.app/payroll/topup/successful",
    customer: {
      email: "user@gmail.com",
      phonenumber: "07064586146",
      name: "joel ugwumadu",
    },
    customizations: {
      title: "Fund Payroll",
      description: "Payment to fund payroll wallet",
      logo: "/WORDMARK.png",
      //   logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  React.useEffect(() => {
    console.log(pub_key);
  }, []);
  const handleFlutterPayment = useFlutterwave(config);
  return (
    <div>
      Checkoutt
      <button
        onClick={() => {
          handleFlutterPayment({
            callback: (response) => {
              console.log(response);
              closePaymentModal(); // this will close the modal programmatically
            },
            onClose: () => {},
          });
        }}
      >
        Payment with React hooks
      </button>
    </div>
  );
};
export default Checkout;
