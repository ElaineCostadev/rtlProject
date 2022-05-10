import React from 'react';
import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Testar o componente About', () => {
/*   it('Verificar se a pagina contem informações da Pokedex', () => {

  }); */

  it('Verificar se a pagina contem um heading h2 com o texto About Pokédex', () => {
    render(<About />);
    const titleEl = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });
    expect(titleEl).toBeDefined();
});

  it('Verificar se a pagina contem dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);
    const p1El = screen.getByText(/This application simulates a Pokédex/i);
    const p2El = screen.getByText(/One can filter Pokémons by type/i);

    expect(p1El).toHaveTextContent(/This application simulates a Pokédex, a/,
      / digital encyclopedia containing all Pokémons/i,);

    expect(p2El).toHaveTextContent(/One can filter Pokémons by type, /,
      / and see more details for each one of them/i);
});

  it('Verificar se a pagina contem  a seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png.', () => {
    render(<About />);
    const imgEl = screen.getByAltText(/Pokédex/i);
    expect(imgEl).toBeInTheDocument();

    const imgEl2 = screen.getByRole('img');
    expect(imgEl2).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
});
