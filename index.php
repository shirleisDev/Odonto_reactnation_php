<?php
// CAPRICHO TÉCNICO: Cabeçalhos de Segurança e CORS Restritos
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Bloqueia qualquer método que não seja POST imediatamente
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["erro" => "Método HTTP não permitido. Utilize POST."]);
    exit();
}

require_once __DIR__ . '/classes/Procedimento.php';
require_once __DIR__ . '/classes/LeadRepository.php';

define("NOME_CLINICA", "Dra. Josiane - Odontologia");
define("PROMO_MES", "CAMPANHA LOCAL: Atendimento de Urgência em Madureira");

try {
    // Captura e decodifica o payload JSON vindo do React Native
    $jsonBruto = file_get_contents("php://input");
    $requisicao = json_decode($jsonBruto, true);

    // CAPRICHO TÉCNICO: Validação robusta de presença de dados
    if (empty($requisicao['nome_paciente']) || empty($requisicao['whatsapp'])) {
        http_response_code(400);
        echo json_encode(["erro" => "Bad Request: Os campos 'nome_paciente' e 'whatsapp' são obrigatórios."]);
        exit();
    }

    // Instanciação e execução desacoplada (POO Pura)
    $procedimento = new Procedimento();
    $repositorio = new LeadRepository();

    $repositorio->salvar(
        $requisicao['nome_paciente'], 
        $requisicao['whatsapp'], 
        $procedimento->getNome(), 
        PROMO_MES
    );

    // Resposta estruturada com sucesso
    http_response_code(200);
    echo json_encode([
        "status" => "Lead capturado com sucesso!",
        "procedimento" => $procedimento->getNome(),
        "valor" => $procedimento->getValor(),
        "parcelas" => $procedimento->getParcelas(),
        "valor_parcela" => $procedimento->getValorParcela(),
        "clinica" => NOME_CLINICA,
        "timestamp" => time()
    ]);

} catch (Exception $e) {
    // CAPRICHO TÉCNICO: Fail-safe (Tratamento de exceção para não quebrar o servidor)
    http_response_code(500);
    echo json_encode([
        "erro" => "Internal Server Error",
        "mensagem" => $e->getMessage()
    ]);
}
