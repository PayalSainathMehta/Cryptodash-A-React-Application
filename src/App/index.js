import React from 'react';
// import logo from './logo.svg';
import './App.css';
import WelcomeMessage from "./WelcomeMessage";
import AppLayout from "./AppLayout";
import AppBar from "./AppBar";
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
        <AppBar />
        <WelcomeMessage/>
        {/*<MyButton>Hello</MyButton>*/}
        {/*<MyButton primary>Hello</MyButton>*/}
        {/*<TomatoButton>Hello</TomatoButton>*/}
      </AppLayout>
  );
}

export default Index;
