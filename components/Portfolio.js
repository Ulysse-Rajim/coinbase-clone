import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { BsThreeDotsVertical } from "react-icons/bs";
import { coins } from "../static/coins";
import Coin from "../components/Coins";
import BalanceChart from "./BalanceChart";
import { nanoid } from "nanoid";
import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";

const Portfolio = ({ address }) => {
  const { provider } = useWeb3();
  const [thirdWebTokens, setThirdwebTokens] = useState([]);
  const [sanityTokens, setSanityTokens] = useState([]);
  const [balances, setBalances] = useState([]);

  const sdk = useMemo(() => {
    if (provider) return new ThirdwebSDK(provider.getSigner());
    return undefined;
  }, [provider]);

  const tempTokens = useMemo(() => {
    if (sdk) {
      if (sanityTokens) {
        setThirdwebTokens([]);
        sanityTokens.map((tokenItem) => {
          const currentToken = sdk.getTokenModule(tokenItem.contractAddress);
          setThirdwebTokens((prevState) => [...prevState, currentToken]);
        });
      }
    }
    return undefined;
  }, [sdk]);

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
  }, [thirdWebTokens]);

  useEffect(() => {
    const getBalances = async (tokens) => {
      setBalances([]);
      const balances =
        tokens &&
        (await tokens.map((token) =>
          token.balanceOf(address).then((result) => {
            // console.log(result);
            setBalances((prevState) => [...prevState, result]);
          })
        ));
    };

    getBalances(thirdWebTokens);
  }, [sanityTokens, thirdWebTokens]);

  const cleanBalances = balances.filter((value, index) => {
    const _value = JSON.stringify(value);
    return (
      index ===
      balances.findIndex((obj) => {
        return JSON.stringify(obj) === _value;
      })
    );
  });

  // console.log("sanityTokens :", sanityTokens);
  // console.log("thirdWebTokens :", thirdWebTokens);
  // console.log("balances: ", cleanBalances);

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
                  <div key={nanoid()}>
                    <Coin coin={coin} />
                    {/* <h2>{coin.name}</h2> */}
                    {/* {console.log("coin:", coin)} */}
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
