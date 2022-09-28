import React, { useState, useEffect } from "react";
import Header from "./Header";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import Main from "./Main";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { ethers } from "ethers";

const Dashboard = ({ address }) => {
  const [sanityTokens, setSanityTokens] = useState([]);
  const [thirdwebTokens, setThirdwebTokens] = useState([]);

  useEffect(() => {
    const getCoins = async () => {
      try {
        const coins = await fetch(
          "https://vuuqbx7n.api.sanity.io/v1/data/query/production?query=*%5B_type%3D%3D'coins'%5D%7B%0A%20%20name%2C%0A%20%20usdPrice%2C%0A%20%20contractAddress%2C%0A%20%20symbol%2C%0A%20%20logo%2C%0A%7D"
        );
        const tempSanityTokens = await coins.json();

        setSanityTokens(tempSanityTokens.result);
      } catch (error) {
        console.error(error);
      }
    };

    getCoins();
    // return;
  }, []);

  useEffect(() => {
    if (sanityTokens) {
      const sdk = new ThirdwebSDK(
        new ethers.Wallet(
          process.env.PRIVATE_KEY,
          ethers.getDefaultProvider(
            "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
          )
        )
      );

      sanityTokens.map((tokenItem) => {
        const currentToken = sdk.getTokenModule(tokenItem.contractAddress);

        setThirdwebTokens((prevState) => [...prevState, currentToken]);
      });
      // console.log("Thirdweb Tokens: ", thirdwebTokens);
    }
  }, [sanityTokens]);

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
