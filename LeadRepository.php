<?php

class LeadRepository {
    private string $caminhoArquivo;

    public function __construct(string $caminhoArquivo = __DIR__ . '/../leads.txt') {
        $this->caminhoArquivo = $caminhoArquivo;
    }

    public function salvar(string $nome, string $whatsapp, string $procedimento, string $campanha): bool {
        // CAPRICHO TÉCNICO: Sanitização contra injeção de scripts no log
        $nomeSanitizado = strtoupper(strip_tags(trim($nome)));
        $whatsappSanitizado = preg_replace('/\D/', '', $whatsapp);
        
        $linhaLog = sprintf(
            "Data: %s | Nome: %s | WhatsApp: %s | Interesse: %s | Local: Madureira | Campanha: %s\n",
            date('Y-m-d H:i:s'),
            $nomeSanitizado,
            $whatsappSanitizado,
            $procedimento,
            $campanha
        );

        // Abertura segura com tratamento de erro
        $arquivo = @fopen($this->caminhoArquivo, 'a');
        if (!$arquivo) {
            throw new Exception("Falha crítica: Sem permissão para gravar o arquivo leads.txt");
        }

        $resultado = fwrite($arquivo, $linhaLog);
        fclose($arquivo);

        return $resultado !== false;
    }
}
