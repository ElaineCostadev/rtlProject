import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente Pokedex', () => {
  it('Verifique se a página contém um h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const titleEl = screen.getByRole('heading',
      { name: /Encountered pokémons/i, level: 2 });
    expect(titleEl).toBeInTheDocument();
  });

  it('Verifique se o proximo pokemon é exibido ao clicar em Próximo pokémon', () => {
    renderWithRouter(<App />);
    // pego o botao
    const buttonNextEl = screen.getByRole('button', { name: /Próximo pokémon/i });
    // verifico se o botao proximo esta na tela
    expect(buttonNextEl).toBeInTheDocument();
    // clico no botao
    userEvent.click(buttonNextEl);
    // pego as informações do proximo pokemon
    // verifico se as informações do proximo pokemon estao na tela
    const namePokemonEl = screen.getByText('Charmander');
    expect(namePokemonEl).toBeInTheDocument();

    const typePokemonEl = screen.getAllByText('Fire');
    expect(typePokemonEl[0]).toBeInTheDocument();

    const weightPokemonEl = screen.getByText('Average weight: 8.5 kg');
    expect(weightPokemonEl).toHaveTextContent('Average weight: 8.5 kg');
    expect(weightPokemonEl).toBeInTheDocument();

    // pego as informações do pokemon anterior para verificar se Não estao na tela
    const namePokemonEl1 = screen.queryByText('Pikachu');
    expect(namePokemonEl1).not.toBeInTheDocument();
  });

  it('Teste se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);
    const namePokemonEl = screen.queryByText('Pikachu');
    expect(namePokemonEl.innerHTML).toBe('Pikachu');
    expect(namePokemonEl).toHaveTextContent('Pikachu');
    expect(namePokemonEl).toBeInTheDocument();
    // elemento pikachu
    expect(namePokemonEl.innerHTML).not.toBe('Charmander');
  });

  it('Teste se a Pokédex tem os botões de filtro.', () => {
    const nine = 9;
    // ajuda em mentoria
    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    renderWithRouter(<App />);
    const allbuttons = screen.getAllByRole('button');
    expect(allbuttons).toBeDefined();
    expect(allbuttons.length).toBe(nine);

    types.forEach((type) => {
      const eachButton = screen.getByRole('button', { name: type });
      expect(eachButton).toBeInTheDocument();
    });

    const buttonAllPokemons = screen.getByRole('button', { name: 'All' });
    expect(buttonAllPokemons).toHaveTextContent('All');
  });

  it('Verifique se o pokemon é filtrado pelo tipo', () => {
    renderWithRouter(<App />);
    // pego todos os botoes
    const buttonType = screen.getAllByTestId('pokemon-type-button');
    // array de cada nome de pokemon
    // ajuda em mentoria
    const eachPokemon = [
      'Pikachu',
      'Charmander',
      'Caterpie',
      'Ekans',
      'Alakazam',
      'Snorlax',
      'Dragonair',
    ];
    // pego o array de cada pokemon e seu index - passo por cada nome
    eachPokemon.forEach((namePokemon, index) => {
      // clico no botao conforme o index - 0, 1, 2 ...
      userEvent.click(buttonType[index]);
      // espero que o nome esteja no documento - uso o query para nao aparecer o erro, caso nao esteja no documento
      expect(screen.queryByText(namePokemon)).toBeInTheDocument();
    });
    // faco um novo array colocando os tipos que foram encontrados
    const types = [];
    buttonType.forEach((type) => {
      types.push(type.innerHTML);
    });
    // depois de criado o array com todos os botoes pego o tipo e o index
    types.forEach((type, index) => {
      // botao do tipo [no index]. elemento - deve ser o mesmo tipo
      expect(buttonType[index].innerHTML).toBe(type);
    });
  });

  it('Verifique se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const buttonReset = screen.getByRole('button', { name: 'All' });
    expect(buttonReset).toHaveTextContent('All');

    userEvent.click(buttonReset);
    const namePokemonEl = screen.getByText('Pikachu');
    expect(namePokemonEl).toHaveTextContent('Pikachu');
    expect(namePokemonEl).toBeInTheDocument();
    // elemento pikachu
    expect(namePokemonEl.innerHTML).toBe('Pikachu');
  });
});
