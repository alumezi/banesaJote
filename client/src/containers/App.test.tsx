import { render, unmountComponentAtNode } from 'react-dom';
import { App } from './App';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, Router } from 'react-router-dom';
import pretty from 'pretty';
// import { createMemoryHistory } from 'history';
import fs from 'fs';

// import { render as testRender, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import '@testing-library/jest-dom';

let container: Element | null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container as HTMLElement);
  (container as HTMLElement).remove();
  container = null;
});

it('navigates', () => {
  act(() => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
      container
    );
  });

  const button = document.querySelector("[data-testid='post_page_button']");
  const postComponent = document.querySelector(
    "[data-testid='post_component']"
  );

  expect(postComponent).not.toBeInTheDocument();

  act(() => {
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  const postComponentAfterRender = document.querySelector(
    "[data-testid='post_component']"
  );

  expect(postComponentAfterRender).toBeInTheDocument();
});

test('renders app', () => {
  render(<App />, container);
});
