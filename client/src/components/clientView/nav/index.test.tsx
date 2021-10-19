import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, Router } from 'react-router-dom';
import pretty from 'pretty';
import Navigation from '.';
// import { createMemoryHistory } from 'history';

// import { render as testRender, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import '@testing-library/jest-dom';

let container: Element | null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container as Element);
  (container as Element).remove();
  container = null;
});

// test('full app rendering/navigating', () => {
//   const history = createMemoryHistory();
//   testRender(
//     <Router history={history}>
//       <Navigation
//         loggedIn={false}
//         logOut={function (): Promise<void> {
//           throw new Error('Function not implemented.');
//         }}
//       />
//     </Router>
//   );
//   // verify page content for expected route
//   // often you'd use a data-testid or role query, but this is also possible
//   expect(screen.getByText(/you are home/i)).toBeInTheDocument();

//   const leftClick = { button: 0 };
//   userEvent.click(screen.getByText(/about/i), leftClick);

//   // check that the content changed to the new page
//   expect(screen.getByText(/you are on the about page/i)).toBeInTheDocument();
// });

it('matches snapshot', () => {
  act(() => {
    render(
      <MemoryRouter>
        <Navigation
          loggedIn={false}
          logOut={function (): Promise<void> {
            throw new Error('Function not implemented.');
          }}
        />
      </MemoryRouter>,
      container
    );
  });

  expect(pretty((container as Element).innerHTML)).toMatchInlineSnapshot(`
    "<div class=\\"flex justify-between items-center py-4 md:justify-start md:space-x-10\\">
      <div class=\\"flex justify-start lg:w-0 lg:flex-1\\"><a href=\\"/\\"><span class=\\"sr-only\\">Header logo</span><img class=\\"h-4 w-auto sm:h-6\\" src=\\"logo.png\\" alt=\\"Banesa jote logo\\"></a></div>
      <div class=\\"md:flex items-center justify-end md:flex-1 lg:w-0\\"><a data-testid=\\"post_page_button\\" class=\\"whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-br from-banesa-green to-green-400 hover:from-banesa-green hover:to-banesa-green\\" href=\\"/post\\">Posto</a><a class=\\"mx-8 whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900\\" href=\\"/login\\">Kyçu</a></div>
    </div>"
  `);
});
