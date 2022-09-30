import Portfolio from "./Portfolio";
import styled from "styled-components";
import Promos from "./Promos";
import React from "react";

const Main = ({ address }) => {
  return (
    <Wrapper>
      <Portfolio address={address} />
      <Promos />
    </Wrapper>
  );
};

export default Main;

const Wrapper = styled.div`
  display: flex;
  max-height: calc(100vh - 64px);
  overflow: hidden;
  overflow-y: scroll;
  :: -webkit-scroller {
    display: none;
  }
  & div {
    border-radius: 0.4rem;
  }
`;
