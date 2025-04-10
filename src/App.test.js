import { render, screen } from '@testing-library/react';
import App from './App';

test('page is opened without error', () => {
    render(<App />);
    const buttonElement = screen.getByText(/Open Modal/i);
    expect(buttonElement).toBeInTheDocument();
});