import Checkout from "../../../components/Checkout";
import TopUp from "../../../components/TopUp";
import Wrapper from "../../../components/Wrapper";

const FundAccount = () => {
  console.log(process.env.NEXT_PUBLIC_API_KEY, "key");
  return (
    <Wrapper>
      <Checkout pub_key={process.env.NEXT_PUBLIC_API_KEY} />
      {/* <TopUp /> */}
    </Wrapper>
  );
};

export default FundAccount;
