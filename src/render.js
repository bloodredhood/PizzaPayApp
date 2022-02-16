import React from 'react';
import { render } from 'react-dom';
import App from './App';

let rerenderEntireTree = (state) => {
  render(
    <App state={state} />,
    document.getElementById('root')
  );
}

export default rerenderEntireTree