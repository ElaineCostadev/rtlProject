import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente NotFound', () => {
  it('Verifica se há um h2 com o texto Page requested not found 😭', () => {
    const { history } = renderWithRouter(<NotFound />);
    // ir para uma pagina inexistente
    history.push('/notFound');
    // pegar o texto
    const titleEl = screen.getByRole('heading',
      { name: /Page requested not found/i, level: 2 });
    // verificar se o texto esta na tela
    expect(titleEl).toBeDefined();

    // verificar se o emoji está na tela
    const emojiEl = screen.getByRole('img', { name: 'Crying emoji' });
    expect(emojiEl).toBeInTheDocument();
  });
  it('Verifica se mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { history } = renderWithRouter(<NotFound />);
    // ir para uma pagina inexistente
    history.push('/notFound');
    // pegar a imagem
    const imgNotFoundEl = screen.getByAltText(/Pikachu crying because the page /,
      /requested was not found/i);
    // verificar se a imagem esta na tela
    expect(imgNotFoundEl).toBeDefined();
    expect(imgNotFoundEl).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
