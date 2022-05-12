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
    /*     // pego o botao do type que quero e o nome que espero
    const typeButtonFire = screen.getByRole('button', { name: /Fire/i });
    // clico
    userEvent.click(typeButtonFire);
    // espero que renderiza o tipo Eletric e o nome Pikachu
    const namePokemonEl = screen.getByText('Charmander');
    expect(typeButtonFire).toHaveTextContent('Fire');
    expect(namePokemonEl).toHaveTextContent('Charmander');

    // pego o botao do type Psychic
    const typeButtonPsychic = screen.getByRole('button', { name: /Psychic/i });
    // clico no botao de type
    userEvent.click(typeButtonPsychic);

    // espero que renderiza o tipo Psychic e o nome Alakazam
    const namePokemonEl2 = screen.getByText('Alakazam');
    expect(namePokemonEl2).toBeInTheDocument();
    expect(namePokemonEl2).toHaveTextContent('Alakazam');
    const typeNamePokemonEl = screen.getAllByText('Psychic');
    expect(typeNamePokemonEl[0]).toBeInTheDocument();

    // pego o botao de proximo pokemon
    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    // clico em proximo
    userEvent.click(nextButton);

    // espero que renderiza o tipo Psychic e o nome Mew
    const namePokemonEl3 = screen.getByText('Mew');
    expect(namePokemonEl3).toBeInTheDocument();
    expect(namePokemonEl3).toHaveTextContent('Mew');
    expect(typeNamePokemonEl[0]).toBeInTheDocument(); */
    // teste
    const buttonType = screen.getAllByTestId('pokemon-type-button');
    const eachPokemon = [
      'Pikachu',
      'Charmander',
      'Caterpie',
      'Ekans',
      'Alakazam',
      'Snorlax',
      'Dragonair',
    ];
    eachPokemon.forEach((namePokemon, index) => {
      userEvent.click(buttonType[index]);
      expect(screen.queryByText(namePokemon)).toBeInTheDocument();
    });
    const types = [];
    buttonType.forEach((type) => {
      types.push(type.innerHTML);
    });
    types.forEach((type, index) => {
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
