import React from 'react';
import { act, render, screen } from '@testing-library/react';
import Button from './Button';
import { unmountComponentAtNode } from 'react-dom';

let container: any = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});


const defaultProps = {
  text: "mockedText",
  click: jest.fn()
}

it("changes value when clicked", () => {

  act(() => {
    render(<Button {...defaultProps} />, container);
  });

  const buttonText: any = document.querySelector("[data-testid=button__text]");
  const buttonA: any = document.querySelector("[data-testid=button__a]");
  expect(buttonText.innerHTML).toBe(defaultProps.text);

  act(() => {
    buttonA.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(defaultProps.click).toHaveBeenCalledTimes(1);

  act(() => {
    for (let i = 0; i < 5; i++) {
      buttonA.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    }
  });

  expect(defaultProps.click).toHaveBeenCalledTimes(6);
 
});
