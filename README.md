# 🦷 Odonto-Gestão: Sistema Móvel de Captação e Triagem Clínica

Aplica-se este projeto como solução de Engenharia de Software focada no comércio local de saúde de Madureira - RJ (Dra. Josiane). A plataforma visa mitigar a barreira de exclusão digital enfrentada por profissionais autônomos sem presença em redes sociais, convertendo tráfego local direto em consultas presenciais por meio de uma arquitetura RESTful assíncrona.

---

## 🎨 Frontend Mobile (React Native + Expo)
- **Interface Minimalista:** Projetada sob a ótica de UX (Experiência do Usuário), adotando a paleta de cores "Chá Verde" para transmitir assepsia e confiança.
- **Funil de Alta Conversão:** Omitiu-se fluxos complexos e calendários síncronos em prol de uma triagem estrita de apenas dois inputs (Nome e WhatsApp).
- **Integração Nativa:** Conexão direta com a API nativa do WhatsApp (`Linking`), despachando o lead pré-qualificado diretamente para o dispositivo do profissional.

---

## 🛠️ Backend RestFul High-End (PHP 8.2 + POO)
O núcleo computacional do ecossistema foi desenvolvido adotando padrões rigorosos de arquitetura de software e Clean Code, destacando-se como o diferencial técnico da aplicação:

### ✨ Diferenciais de Engenharia Aplicados:
1. **Princípio da Responsabilidade Única (SRP):** Desacoplamento estrito de funções. A classe `Procedimento` responde estritamente pelas regras de negócio e precificações ocultas, enquanto a classe `LeadRepository` isola o acesso e persistência no disco.
2. **Segurança de Borda & Sanitização:** O controlador central restringe de forma nativa o tráfego a requisições do tipo `POST`, sanitizando todas as strings de entrada via filtros de barreira (`strip_tags` e regex) contra ataques de injeção de scripts (XSS).
3. **Resiliência a Falhas (Fail-Safe):** Implementação de blocos estruturados de captura de exceções (`try-catch`), impedindo vazamento de dados internos do servidor e garantindo respostas elegantes padronizadas no formato JSON HTTP Status.

---

## 📁 Estrutura Arquitetural do Repositório

```text
odonto_app-reactNativ_php/
├── backend_php/             # Camada Servidora (API REST)
│   ├── classes/
│   │   ├── Procedimento.php # Domínio: Regras de Negócio Ocultas
│   │   └── LeadRepository.php # Dados: Persistência DAO/Repository
│   ├── index.php            # Controlador Central e Roteador Rest
│   └── leads.txt            # Log de Persistência Permanente
│
└── frontend-mobile/         # Camada de Interface Móvel
    ├── App.js               # Layout Responsivo SDK 54 & Fetch API
    └── package.json         # Manifesto de Dependências Expo
```

---

## 🏃‍♂️ Como Executar o Ecossistema Localmente

### 1. Iniciar o Servidor Apache (Backend)
1. Certifique-se de que este repositório está alocado no diretório `htdocs/` do seu servidor **XAMPP**.
2. Ative o módulo Apache no painel de controle do ambiente.

### 2. Executar o Aplicativo (Frontend)
Navegue até a pasta do aplicativo móvel pelo terminal e execute as rotinas de inicialização:
```bash
cd frontend-mobile
npm install
npx expo start -c
```
Aponte o aplicativo do seu smartphone para o QR Code gerado no terminal.
