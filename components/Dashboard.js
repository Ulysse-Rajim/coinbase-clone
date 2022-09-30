import React, { useState, useEffect } from "react";
import Header from "./Header";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import Main from "./Main";

export const Dashboard = ({ address }) => {
  return (
    <Wrapper>
      <Sidebar />
      <MainContainer>
        <Header address={address} />
        <Main address={address} />
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
