import React from "react";
import { coins } from "../static/coins";
import styled from "styled-components";
import Image from "next/image";
import { BsThreeDotsVertical } from "react-icons/bs";

const Coins = ({ coin }) => {
  return (
    <Wrapper>
      <div>
        <div>
          <NameCol>
            <CoinIcon>
              <Image src={coin.logo} alt={coin.name} />
            </CoinIcon>
            <div>
              <Primary>{coin.name}</Primary>
              <Secondary>{coin.sign}</Secondary>
            </div>
          </NameCol>
        </div>
        <div>
          <Primary>
            {"$"}
            {coin.balanceUsd}
          </Primary>
          <Secondary>
            {coin.balanceCoin} {coin.sign}
          </Secondary>
        </div>
        <div>
          <Primary>
            {"$"}
            {coin.priceUsd}
          </Primary>
          <div style={{ color: coin.change < 0 ? "#f0616d" : "#26ad75" }}>
            {coin.change > 0 && "+"}
          </div>
        </div>
        <div>{coin.allocation}%</div>
        <div>
          <BsThreeDotsVertical />
        </div>
      </div>
    </Wrapper>
  );
};

export default Coins;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  & > div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
  }
`;

const NameCol = styled.div`
  display: flex;
  align-items: center;
`;

const CoinIcon = styled.div`
  width: 1.8rem;
  margin-right: 1rem;
`;

const Primary = styled.div`
  margin-bottom: 0.1rem;
`;

const Secondary = styled.div`
  color: #8a919e;
  font-size: 0.8rem;
`;
