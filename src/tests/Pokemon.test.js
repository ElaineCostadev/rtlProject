import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  it('Verifique se é renderizado um card com as informações do Pokemon', () => {
    renderWithRouter(<App />);
    const namePokemonEl = screen.getByTestId('pokemon-name');
    expect(namePokemonEl).toBeInTheDocument();
    expect(namePokemonEl).toHaveTextContent('Pikachu');

    const typePokemonEl = screen.getByTestId('pokemon-type');
    expect(typePokemonEl).toBeInTheDocument();
    expect(typePokemonEl).toHaveTextContent('Electric');

    const weightPokemonEl = screen.getByTestId('pokemon-weight');
    expect(weightPokemonEl).toBeInTheDocument();
    expect(weightPokemonEl).toHaveTextContent('Average weight: 6.0 kg');

    const imgEl = screen.getByAltText('Pikachu sprite');
    expect(imgEl).toBeInTheDocument();

    const imgEl2 = screen.getByRole('img');
    expect(imgEl2).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  it('Verifica se há um link de navegacao para Details', () => {
    const { history } = renderWithRouter(<App />);
    const linkdetails = screen.getByRole('link', { name: /More details/i });
    expect(linkdetails).toBeInTheDocument();

    userEvent.click(linkdetails);
    expect(history.location.pathname).toBe('/pokemons/25');
  });
  it('Verifique se existe o icone de estrela nos pokemons favoritados', () => {
    // pagina principal Home
    const { history } = renderWithRouter(<App />);
    // peguei o link com os detalhes, verificando se está na tela
    const linkDetailsEl = screen.getByRole('link', { name: /More details/i });
    expect(linkDetailsEl).toBeInTheDocument();
    // cliquei no link More details
    userEvent.click(linkDetailsEl);
    // verifiquei se ao clicar, fui para a tela dos detalhes do pokemon
    expect(history.location.pathname).toBe('/pokemons/25');
    // pegar o checkbox que tem a frase Pokémon favoritado?
    const checkboxEl = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    // verificar se esta na tela
    expect(checkboxEl).toBeInTheDocument();
    // clicar em Pokémon favoritado
    userEvent.click(checkboxEl);
    // verificar se foi incluido a estrelinha - find?
    const imgStar = screen.getByAltText(/Pikachu is marked as favorite/i);
    // verificar se está na tela
    expect(imgStar).toBeDefined();
    expect(imgStar).toHaveAttribute('src', '/star-icon.svg');
    // verificar se o checkbox ficou true
    const checkboxElTrue = screen.getByRole('checkbox', { checked: true });
    expect(checkboxElTrue).toBeChecked();
    // voltar para a Home
    const linkEl = screen.getByRole('link', { name: /Home/i });
    // verificar se esta na tela
    expect(linkEl).toBeInTheDocument();
    // clicar no link HOME
    userEvent.click(linkEl);
    // verificar se fui para a pagina /
    expect(history.location.pathname).toBe('/');
    // verificar se renderizou o pokemon favorito com o nome Pikachu
    const namePokemonEl = screen.getByTestId('pokemon-name');
    expect(namePokemonEl).toBeInTheDocument();

    const typePokemonEl = screen.getByTestId('pokemon-type');
    expect(typePokemonEl).toBeInTheDocument();

    const weightPokemonEl = screen.getByTestId('pokemon-weight');
    expect(weightPokemonEl).toBeInTheDocument();

    const imgPokemonEl = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(imgPokemonEl).toBeInTheDocument();
  });
});
