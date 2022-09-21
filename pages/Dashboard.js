import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import styled from "styled-components";
import Portfolio from "../components/Portfolio";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import { useToken, ConnectWallet, useTokenBalance } from "@thirdweb-dev/react";
import { ethers } from "ethers";

import debounce from "lodash/debounce";

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const rpcUrl = "https://rinkeby.infura.io/v3/";

// const wallet = new ethers.Wallet(
//   PRIVATE_KEY,
//   ethers.getDefaultProvider(rpcUrl)
// );

const Dashboard = ({ address, sanityTokens }) => {
  const [thirdwebTokens, setThirdwebTokens] = useState([]);
  const [value, setValue] = useState(0);
  const tokens = [];

  useToken(
    sanityTokens.map(async (token) => {
      tokens.push(token.contractAddress);
    })
  );

  // const getTokens = throttle(async () => {
  //   try {
  //     const coins = await fetch(
  //       "https://vuuqbx7n.api.sanity.io/v1/data/query/production?query=*%5B_type%3D%3D'coins'%5D%7B%0A%20%20name%2C%0A%20%20usdPrice%2C%0A%20%20contractAddress%2C%0A%20%20symbol%2C%0A%20%20logo%2C%0A%7D"
  //     );
  //     const sanityTokens = (await coins.json()).result;
  //     setSanityTokens(sanityTokens);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, 1000);

  useEffect(() => {
    const listener = debounce(() => {
      setThirdwebTokens(tokens);
    }, 1000);
    debounce(listener, 1000);
  }, []);

  return (
    <Wrapper>
      <Sidebar />
      <MainContainer>
        <Header
          walletAddress={address}
          sanityTokens={sanityTokens}
          thirdwebTokens={thirdwebTokens}
        />
        <Main
          walletAddress={address}
          sanityTokens={sanityTokens}
          thirdwebTokens={thirdwebTokens}
        />
      </MainContainer>
    </Wrapper>
  );
};

export default Dashboard;

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #0a0b0d;
  color: white;
  overflow: hidden;
`;

const MainContainer = styled.div`
  flex: 1;
`;
