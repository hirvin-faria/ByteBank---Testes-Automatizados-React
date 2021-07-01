import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import App, { calcularNovoSaldo } from './App';

describe('Componente principal', () => {
    describe('Quando o componente e renderizado', () => {
        it('mostrar nome do banco', () => {
            render(<App />);

            expect(screen.getByText('ByteBank')).toBeInTheDocument();
        });

        it('o saldo e exibido', () => {
            render(<App />);

            expect(screen.getByText('Saldo:')).toBeInTheDocument();
        });

        it('o botao de realizar transacao e exibido', () => {
            render(<App />);

            expect(screen.getByText('Realizar operação')).toBeInTheDocument();
        });
    });

    describe('Quando eu realizo uma transacao', () => {
        it('que e um saque, o valor vai diminuir', () => {
            const valores = {
                transacao: 'saque',
                valor: 50
            };
            const saldo = 150;

            const novoSaldo = calcularNovoSaldo(valores, saldo);

            expect(novoSaldo).toBe(100);
        });

        it('que e um saque, a transacao deve ser realizada', () => {
            const { 
                getByText,
                getByTestId,
                getByLabelText
            } = render(<App />);

            const saldo = getByText('R$ 1000');
            const transacao = getByLabelText('Saque');
            const valor = getByTestId('valor');
            const botaoTransacao = getByText('Realizar operação');

            expect(saldo.textContent).toBe('R$ 1000');

            fireEvent.click(transacao, { target: { value: 'saque'}});
            fireEvent.change(valor, { target: { value: 10}});
            fireEvent.click(botaoTransacao);

            expect(saldo.textContent).toBe('R$ 990');
        });

        it('que e um saque, a transacao deve ser realizada', () => {
            render(<App />);

            const saldo = screen.getByText('R$ 1000');
            const transacao = screen.getByLabelText('Saque');
            const valor = screen.getByTestId('valor');
            const botaoTransacao = screen.getByText('Realizar operação');

            expect(saldo.textContent).toBe('R$ 1000');

            fireEvent.click(transacao, { target: { value: 'saque'}});
            fireEvent.change(valor, { target: { value: 10}});
            fireEvent.click(botaoTransacao);

            expect(saldo.textContent).toBe('R$ 990');
        });
    });
});