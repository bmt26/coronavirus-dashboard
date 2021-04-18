import { render, screen, fireEvent } from '@testing-library/react';
import { ReactDOM } from 'react-dom';
import App from './App';

const getLoginButton = () => {
  return screen.getByText("Login");
}

test("Ensure that the Login button appears upon user landing", () => {
  const result = render(<App />);
  const loginButton = getLoginButton();
  expect(loginButton).toBeInTheDocument();
});
