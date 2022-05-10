import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testar o componente FavoritesPokemons', () => {
  it('Verifica se o texto Favorite pokémons está renderizado', () => {
    render(<FavoritePokemons />);
    const titleEl = screen.getByRole('heading', { name: /Favorite pokémons/i, level: 2 });
    expect(titleEl).toBeDefined();
  });
  it('Verifica se é exibida a mensagem No favorite pokemon found', () => {
    render(<FavoritePokemons />);
    const msgEl = screen.getByText(/No favorite pokemon found/i);
    expect(msgEl).toBeInTheDocument();
  });

  it('Verifica se são exibidos todos os cards de pokemons favoritos', async () => {
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
    const imgStar = await screen.findByAltText(/Pikachu is marked as favorite/i);
    // verificar se está na tela
    expect(imgStar).toBeDefined();
    // verificar se o checkbox ficou true
    const checkboxElTrue = screen.getByRole('checkbox', { checked: true });
    expect(checkboxElTrue).toBeChecked();
    // pegar o link Favorite Pokemons
    const linkEl = screen.getByRole('link', { name: /Favorite Pokémons/i });
    // verificar se esta na tela
    expect(linkEl).toBeInTheDocument();
    // clicar no link Favorite Pokémons
    userEvent.click(linkEl);
    // verificar se fui para a pagina /favorites
    expect(history.location.pathname).toBe('/favorites');
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
