import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
//import App from './App';
import CheckoutPage from './pages/CheckoutPage';
import SignUpPage from './pages/SignUpPage';

// test('full app rendering', async () => {
//     render(<App />)
//     // verify page content for default route
//     expect(screen.getByText(/This is the home page./i)).toBeInTheDocument()
// })
  
test('signup page rendering/navigating', async () => {
  render(<SignUpPage />)
  expect(screen.getAllByText(/Sign Up/i)[1]).toBeInTheDocument()

  const component = renderer.create(<SignUpPage />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})

test('checkout page rendering/navigating', async () => {
  render(<CheckoutPage />)
  expect(screen.getByText(/Checkout/i)).toBeInTheDocument()

  const component = renderer.create(<CheckoutPage />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})
