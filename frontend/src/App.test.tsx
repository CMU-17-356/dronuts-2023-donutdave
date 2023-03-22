import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import CheckoutPage from './pages/CheckoutPage';
import SignUpPage from './pages/SignUpPage';
  
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
