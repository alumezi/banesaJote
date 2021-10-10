import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import Navigation from '.';
import pretty from 'pretty';

let container = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders with router', () => {
  act(() => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>,
      container
    );
  });
});

it('matches snapshot', () => {
  act(() => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>,
      container
    );
  });

  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
    "<div class=\\"flex justify-between items-center py-4 md:justify-start md:space-x-10\\">
      <div class=\\"flex justify-start lg:w-0 lg:flex-1\\"><a href=\\"/\\"><span class=\\"sr-only\\">Header logo</span><img class=\\"h-4 w-auto sm:h-6\\" src=\\"logo.png\\" alt=\\"Banesa jote logo\\"></a></div>
      <div class=\\" md:flex items-center justify-end md:flex-1 lg:w-0\\"><a class=\\"whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-br from-banesa-green to-green-400 hover:from-banesa-green hover:to-banesa-green\\" href=\\"/post\\">Posto</a><a class=\\"mx-8 whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900\\" href=\\"/login\\">Kyçu</a></div>
    </div>"
  `);
});
