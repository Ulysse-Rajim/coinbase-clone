import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import styled from "styled-components";
import Portfolio from "../components/Portfolio";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
// import { ThirdwebSDK } from "@3rdweb/sdk";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const rpcUrl = "https://rinkeby.infura.io/v3/";

const wallet = new ethers.Wallet(
  PRIVATE_KEY,
  ethers.getDefaultProvider(rpcUrl)
);

// const sdk = new ThirdwebSDK(wallet);
// const sdk = ThirdwebSDK.fromSigner(ethers.Wallet.createRandom(), "rinkeby");
const sdk = ThirdwebSDK.fromPrivateKey(PRIVATE_KEY, "rinkeby");

const Dashboard = ({ address }) => {
  const [sanityTokens, setSanityTokens] = useState([]);
  const [thirdwebTokens, setThirdwebTokens] = useState([]);

  useEffect(() => {
    // const getBalance = async () => {
    //   const balance = await sdk.getBalance(address);
    //   console.log("Balance: ", balance.displayValue);
    // };

    // getBalance();

    const getTokens = async () => {
      try {
        const coins = await fetch(
          "https://vuuqbx7n.api.sanity.io/v1/data/query/production?query=*%5B_type%3D%3D'coins'%5D%7B%0A%20%20name%2C%0A%20%20usdPrice%2C%0A%20%20contractAddress%2C%0A%20%20symbol%2C%0A%20%20logo%2C%0A%7D"
        );
        const sanityTokens = (await coins.json()).result;
        // console.log(sanityTokens);
        setSanityTokens(sanityTokens);

        sanityTokens.map(async (token) => {
          // setThirdwebTokens(await sdk.wallet.balance());
          const balance = await sdk.getBalance(address);
          // const balance = await sdk.wallet.balance();
          // console.log(balance);
          console.log(token);
        });
      } catch (err) {
        console.log(err);
      }
    };

    // const getBalance = async () => {
    //   const balance = await sdk.getBalance(address);
    //   console.log(balance);
    // };
    // getBalance();

    getTokens();
  }, []);

  // console.log("Sanity: ", sanityTokens);
  // console.log("ThirdWeb: ", thirdwebTokens);

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
