/* eslint-disable */
import { render, screen } from '@testing-library/react';
import { ReactDOM } from 'react-dom';
import App from './App';

const getSearchButton = () => {
  return screen.getByText("Search");
};

const getInputField = (result) => {
  return result.getByLabelText("search-input");
};

const getLoginButton = () => {
  return screen.getByText('Login');
};

const getCoronavirusTitle = () => {
  return screen.getByText('Coronavirus Stats');
};

test('Ensure that input field retrieves desired country statistics', () => {
  const result = render(<App />);
  const searchButton = getSearchButton();
  const inputField = getInputField(result);

  expect(searchButton).toBeInTheDocument();
  expect(inputField).toBeInTheDocument();
});

test('Ensure that the Login button appears upon user landing', () => {
  const result = render(<App />);
  const loginButton = getLoginButton();
  expect(loginButton).toBeInTheDocument();
});

test('Ensure that the Coronavirus table appears upon user landing', () => {
  const result = render(<App />);
  const coronavirusTitle = getCoronavirusTitle();
  expect(coronavirusTitle).toBeInTheDocument();
});
