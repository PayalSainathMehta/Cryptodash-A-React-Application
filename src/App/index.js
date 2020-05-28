import React from 'react';
// import logo from './logo.svg';
import './App.css';
import AppLayout from "./AppLayout";
import AppBar from "./AppBar";
import {AppProvider} from "./AppProvider";
import Content from "../Shared/Content";
import Settings from "../Settings";
import WelcomeMessage from "../Settings/WelcomeMessage";
// import styled, {css} from "styled-components";

// const MyButton = styled.div`
//   color: green;
//   // ${props => props.primary && css`
//   //       color: palevioletred;
//   // ` }
// `

// const TomatoButton = styled(MyButton)`
//     color: tomato;
//     border-color: tomato;
// `
function Index() {
  return (
      <AppLayout>
        <AppProvider>
            <AppBar/>
               <Content>
                 <Settings/>
                 {/*Welcome to CryptoDash!*/}
               </Content>
        </AppProvider>
      </AppLayout>
  );
}

export default Index;
