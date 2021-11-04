import { act, render } from '@testing-library/react';
import Cart from './Cart';
import { unmountComponentAtNode } from 'react-dom';
import {CartItemType} from '../Models/CartItemType';

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

const item: CartItemType = {
  id: "1",
  image_url: "image_url",
  stock: 5,
  productName: "productName",
  price: 5,
  productDescription: "productDescription",
  favorite: "1",
  totalCount: 10,
  totalPrice: 10

};
const defaultProps = {
  item,
  incrementEvent: jest.fn(),
  decrementEvent: jest.fn(),
  removeEvent: jest.fn()
}

it("changes value when clicked", () => {

  act(() => {
    render(<Cart {...defaultProps} />, container);
  });
  const buttonIncrement: any = document.querySelector("[data-testid=cart__increment]");
  const buttonDecrement: any = document.querySelector("[data-testid=cart__decrement]");
  const buttonRemove: any = document.querySelector("[data-testid=cart__remove]");

  expect(buttonIncrement.innerHTML).toBe('+');
  expect(buttonDecrement.innerHTML).toBe('-');
  expect(buttonRemove.innerHTML).toBe('X');

  act(() => {
    buttonIncrement.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    buttonDecrement.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    buttonRemove.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(defaultProps.incrementEvent).toHaveBeenCalledTimes(1);
  expect(defaultProps.decrementEvent).toHaveBeenCalledTimes(1);
  expect(defaultProps.removeEvent).toHaveBeenCalledTimes(1);
});
