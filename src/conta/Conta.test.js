import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Conta from './Conta';

describe('Componente Conta', () => {
    it('Exibir saldo da conta como valor monetario', () => {
        render(<Conta saldo={1000} />);

        const saldo = screen.getByTestId('saldo-conta');

        expect(saldo.textContent).toBe('R$ 1000');

    });

    it('Chama funcao de realizar transacao, quando o botao e clicado', () => {
        const funcaoRealizarTransacao = jest.fn();

        render(<Conta saldo={1000} realizarTransacao={funcaoRealizarTransacao} />);

        fireEvent.click(screen.getByText('Realizar operação'));

        expect(funcaoRealizarTransacao).toHaveBeenCalled();
    });
});