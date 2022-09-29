import React from "react";
import styled from "styled-components";
import Dashboard from "../components/Dashboard";
import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { ethers } from "ethers";

export default function Home({ balances, sanityTokens }) {
  const { address, connectWallet } = useWeb3();

  return (
    <Wrapper>
      {address ? (
        <Dashboard
          address={address}
          sanityTokens={sanityTokens}
          balances={balances}
        />
      ) : (
        <WalletConnect>
          <Button onClick={() => connectWallet("injected")}>
            Connect Wallet
          </Button>
          <Details>
            You need Chrome to be <br /> able to run this app
          </Details>
        </WalletConnect>
      )}
    </Wrapper>
  );
}

export async function getServerSideProps() {
  const address = "0x748965F1e7883D3E3aF80a4c9C8bE05B3D72f5Bc";
  const sdk = new ThirdwebSDK(
    new ethers.Wallet(
      process.env.PRIVATE_KEY,
      ethers.getDefaultProvider(
        "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
      )
    )
  );

  const coins = await fetch(
    "https://vuuqbx7n.api.sanity.io/v1/data/query/production?query=*%5B_type%3D%3D'coins'%5D%7B%0A%20%20name%2C%0A%20%20usdPrice%2C%0A%20%20contractAddress%2C%0A%20%20symbol%2C%0A%20%20logo%2C%0A%7D"
  );
  const sanityTokens = await coins.json();

  const thirdWebTokens = [
    sdk.getTokenModule(sanityTokens.result[0].contractAddress),
    sdk.getTokenModule(sanityTokens.result[1].contractAddress),
  ];

  console.log(address);
  console.log(thirdWebTokens[0].address);

  const getBalance = async (activeTwToken) => {
    const balance = activeTwToken && (await activeTwToken.balanceOf(address));

    return parseInt(activeTwToken && balance.displayValue);
  };

  const balances = await getBalance(thirdWebTokens[1]);
  console.log(JSON.parse(JSON.stringify(balances)));

  return {
    props: {
      balances: JSON.parse(JSON.stringify(balances)),
      sanityTokens: JSON.parse(JSON.stringify(sanityTokens.result)),
    },
  };
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
