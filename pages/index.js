import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Dashboard from "./Dashboard";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import debounce from "lodash/debounce";

export default function Home() {
  // const { address, connectWallet } = useWeb3();
  const address = useAddress();

  const [sanityTokens, setSanityTokens] = useState([]);

  const getTokens = async () => {
    try {
      const coins = await fetch(
        "https://vuuqbx7n.api.sanity.io/v1/data/query/production?query=*%5B_type%3D%3D'coins'%5D%7B%0A%20%20name%2C%0A%20%20usdPrice%2C%0A%20%20contractAddress%2C%0A%20%20symbol%2C%0A%20%20logo%2C%0A%7D"
      );
      const sanityTokens = (await coins.json()).result;
      setSanityTokens(sanityTokens);
      console.log("Sanity tokens: ", sanityTokens);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // const listener = debounce(() => {
    getTokens();
    // }, 1000);
    //debounce(listener, 1000);
  }, []);

  return (
    <Wrapper>
      {address ? (
        <Dashboard address={address} sanityTokens={sanityTokens} />
      ) : (
        <WalletConnect>
          {/* <Button onClick={() => connectWallet("injected")}>
            Connect Wallet
          </Button> */}
          <ConnectWallet accentColor="#f213a4" colorMode="light" />
          <Details>
            You need Chrome to be <br /> able to run this app
          </Details>
        </WalletConnect>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  max-width: 100vw;
  background-color: #0a0b0d;
  color: white;
  display: grid;
  place-items: center;
`;

const Details = styled.div`
  font-size: 1.2rem;
  text-align: center;
  margin-top: 1rem;
  font-weight: 500;
  color: #282b2f;
`;

const WalletConnect = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Button = styled.div`
  border: 1px solid #282b2f;
  padding: 0.8rem;
  font-size: 1.3rem;
  font-weight: 500;
  border-radius: 0.4rem;
  background-color: #3773f5;
  color: #000;

  &:hover {
    cursor: pointer;
  }
`;
