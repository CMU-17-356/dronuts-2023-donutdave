import { render, screen } from '@testing-library/react';
import App from './App';

test('full app rendering/navigating', async () => {
    render(<App />)
    // verify page content for default route
    expect(screen.getByText(/This is the home page./i)).toBeInTheDocument()
  })