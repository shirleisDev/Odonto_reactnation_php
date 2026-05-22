<?php

class Procedimento {
    private string $nomeFormatado;
    private float $valor;
    private int $parcelas;

    public function __construct() {
        // Regra de negócio centralizada e protegida no servidor
        $this->nomeFormatado = "Avaliação Geral + Limpeza Ultrassônica";
        $this->valor = 150.00;
        $this->parcelas = 2;
    }

    public function getNome(): string {
        return $this->nomeFormatado;
    }

    public function getValor(): float {
        return $this->valor;
    }

    public function getParcelas(): int {
        return $this->parcelas;
    }

    public function getValorParcela(): float {
        return $this->valor / $this->parcelas;
    }
}
