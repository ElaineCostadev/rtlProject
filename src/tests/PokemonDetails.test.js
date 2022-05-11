import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const pathName = '/pokemons/25';

describe('Verificar o componente Pokemon Details', () => {
  it('Verifique se as informações detalhadas do pokemon aparecem na tela', () => {
    const { history } = renderWithRouter(<App />);
    // history.push(pathName);
    const linkdetails = screen.queryByRole('link', { name: /More details/i });
    expect(linkdetails).toBeInTheDocument();
    userEvent.click(linkdetails);
    // fui para a pagina de detalhes do pokemon
    expect(history.location.pathname).toBe(pathName);
    // verifico se tem o texto do pokemon que digitei
    const titleEl = screen.getByRole('heading', { name: /Pikachu Details/i, level: 2 });
    expect(titleEl).toBeInTheDocument();
    // verifico que o MoreDetails nao está no documento
    expect(linkdetails).not.toBeInTheDocument();

    const title2El = screen.getByRole('heading', { name: /Summary/i, level: 2 });
    expect(title2El).toHaveTextContent(/Summary/i);

    const three = 3;
    const allHeading = screen.getAllByRole('heading', { level: 2 });
    expect(allHeading.length).toBe(three);
    expect(allHeading[0]).toHaveTextContent('Pikachu Details');
    expect(allHeading[1]).toHaveTextContent('Summary');

    const textDetails = screen.getByText(/This intelligent Pokémon roasts hard berries/,
      /with electricity to make them tender enough to eat./i);
    expect(textDetails).toBeInTheDocument();
  });
  it('Verifique se existe um mapa com a localização do pokemon', () => {
    const { history } = renderWithRouter(<App />);
    const linkdetails = screen.queryByRole('link', { name: /More details/i });
    expect(linkdetails).toBeInTheDocument();
    userEvent.click(linkdetails);
    // fui para a pagina de detalhes do pokemon
    expect(history.location.pathname).toBe(pathName);

    const title3El = screen.getByRole('heading', { name: /Game Locations of Pikachu/i });
    expect(title3El).toBeInTheDocument();

    const altImg = screen.getAllByAltText('Pikachu location');
    expect(altImg[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(altImg[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');

    const paragraph1 = screen.getByText(/Kanto Viridian Forest/i);
    expect(paragraph1).toBeInTheDocument();

    const paragraph2 = screen.getByText(/Kanto Power Plant/i);
    expect(paragraph2).toBeInTheDocument();
  });
  it('Verifique se o usuario pode favoritar um pokemon', () => {
    const { history } = renderWithRouter(<App />);
    const linkdetails = screen.queryByRole('link', { name: /More details/i });
    expect(linkdetails).toBeInTheDocument();
    userEvent.click(linkdetails);
    // fui para a pagina de detalhes do pokemon
    expect(history.location.pathname).toBe(pathName);
    // const checkboxEl = screen.getByRole('checkbox',{ name: /Pokémon favoritado?/i });
    const checkboxEl = screen.getByLabelText(/Pokémon favoritado?/i);
    // verificar se esta na tela
    expect(checkboxEl).toBeInTheDocument();
    // clicou em checkbox
    userEvent.click(checkboxEl);
    // checked true
    const checkboxElTrue = screen.getByRole('checkbox', { checked: true });
    expect(checkboxElTrue).toBeChecked();
    // clicou em checkbox
    userEvent.click(checkboxEl);
    // checked false
    const checkboxElFalse = screen.queryByRole('checkbox', { checked: false });
    expect(checkboxElFalse).not.toBeChecked();
  });
});
