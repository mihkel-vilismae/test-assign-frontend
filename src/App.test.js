import { render, screen } from '@testing-library/react';
import App from './App';

test('page is opened without error', () => {
    render(<App />);
    const buttonElement = screen.getByText(/Open Modal/i);
    expect(buttonElement).toBeInTheDocument();
});

// add test that add row button is present and works
test('add row button is present and works', () => {
    render(<App/>);
    const addRowButton = screen.getByText(/Add Row/i);
    expect(addRowButton).toBeInTheDocument();
    addRowButton.click();
    const newRow = screen.getByRole("criteria-row");
    expect(newRow).toBeInTheDocument().count(1);
    const twoSelects = screen.getByRole("criteria-row").getAll('select');
    expect(twoSelects).toBeInTheDocument().count(2);

})
test('add multiple row buttosn and also chekf if corrent elemets appear', () => {
    render(<App/>);
    const addRowButton = screen.getByText(/Add Row/i);
    addRowButton.click();
    addRowButton.click();
    const twoRows = screen.getByRole("div.criteria-row")    ;
    expect(twoRows).toBeInTheDocument().count(2);

    const fourSelects = screen.getByRole("div.criteria-row").getAll('select');
    expect(fourSelects).toBeInTheDocument().count(4);
    expect(fourSelects).toBeInTheDocument().count(2);

    // expect two numberic inputs from the both rows sum
    const numericInputs = screen.getByRole("criteria-row").getAll('input[type="number"]');
    expect(numericInputs).toBeInTheDocument().count(2);
});