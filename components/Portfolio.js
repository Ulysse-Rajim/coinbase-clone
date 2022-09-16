import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BsThreeDotsVertical } from "react-icons/bs";
import { coins } from "../static/coins";
import Coin from "../components/Coins";
import BalanceChart from "./BalanceChart";

const Portfolio = ({ walletAddress, sanityTokens, thirdwebTokens }) => {
  // const balance = [];
  // console.log(thirdwebTokens);
  // async function getBalance() {
  //   balance = await sdk.getBalance(walletAddress, sanityTokens);
  // }

  console.log(thirdwebTokens);

  return (
    <Wrapper>
      <Content>
        <Chart>
          <div>
            <Balance>
              <BalanceTitle>Portfolio Balance</BalanceTitle>
              <BalanceValue>
                {"$"}
                46000
              </BalanceValue>
            </Balance>
          </div>
        </Chart>
        <BalanceChart />
        <PortfolioTable>
          <TableItem>
            <Title>Your Assets</Title>
          </TableItem>
          <Divider />
          <Table>
            <TableItem>
              <TableRow>
                <div>Name</div>
                <div>Balance</div>
                <div>Price</div>
                <div>Allocation</div>
                <BsThreeDotsVertical />
              </TableRow>
            </TableItem>
            <Divider>
              <div>
                {coins.map((coin) => (
                  <div>
                    <Coin coin={coin} />
                    {/* <h2>{coin.name}</h2> */}
                    <Divider />
                  </div>
                ))}
              </div>
            </Divider>
          </Table>
        </PortfolioTable>
      </Content>
    </Wrapper>
  );
};

export default Portfolio;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  height: 100%;
`;
const Content = styled.div`
  width: 100%;
  max-width: 1000px;
  padding: 2rem 1rem;
`;

const Chart = styled.div`
  border: 1px solid #282b2f;
  padding: 1rem 2rem;
`;

const Balance = styled.div``;

const BalanceTitle = styled.div`
  color: #8a919e;
  font-size: 0.9rem;
`;

const BalanceValue = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0.5rem 0;
`;

const PortfolioTable = styled.div`
  margin-top: 1rem;
  border: 1px solid #282b2f;
`;

const Table = styled.div`
  width: 100%;
`;

const TableRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  & > th {
    text-align: left;
  }
`;

const TableItem = styled.div`
  padding: 1rem 2rem;
`;

const Divider = styled.div`
  border-bottom: 1px solid #282b2f;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
`;