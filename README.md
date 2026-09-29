# Portal PSJE — Paróquia São João Evangelista

Site oficial de centralização de informações da Paróquia São João Evangelista, construído em HTML, CSS e JavaScript puros, sem frameworks e sem back-end.

## Apresentação

O Portal PSJE reúne, em um único endereço, tudo o que hoje costuma estar espalhado entre grupos de WhatsApp, avisos de fim de missa, cartazes impressos e conversas informais: a história da paróquia, a agenda de missas e eventos, os contatos da secretaria e de cada pastoral, as formas de doação e um canal formal para envio de pedidos e dúvidas.

## Introdução

Paróquias costumam ter uma vida comunitária rica — muitas pastorais, eventos frequentes, doações constantes — mas pouca estrutura para comunicar tudo isso de forma organizada. Quem procura uma informação específica (o número do WhatsApp da catequese, a chave Pix, o horário de uma missa alterada) frequentemente depende de perguntar para alguém, ou de encontrar um post antigo em uma rede social.

## O problema

- **Informação espalhada.** Contato de pastoral, chave Pix, horário de missa e agenda de eventos vivem em lugares diferentes (grupos de WhatsApp, cartazes, boca a boca), sem um ponto único e confiável de consulta.
- **Sobrecarga da secretaria.** Perguntas repetidas ("qual o horário da missa de sábado?", "como faço para doar?", "qual o WhatsApp da pastoral da família?") consomem tempo que poderia ser dedicado a outras tarefas.
- **Falta de canal formal de solicitação.** Sem um formulário estruturado, pedidos e dúvidas se perdem em conversas informais ou nunca chegam ao setor certo.
- **Atualização de agenda depende de alguém mexer no site.** Em um site estático comum, adicionar um evento novo exigiria editar código-fonte — inviável para quem cuida da comunicação da paróquia no dia a dia.

## Como o portal ajuda

- **Centraliza** história, notícias, agenda, contatos, pastorais e doações em um único lugar, acessível pelo celular ou computador.
- **Reduz perguntas repetidas**, já que horários de missa, chave Pix e contatos de cada pastoral ficam sempre visíveis e atualizados.
- **Direciona cada pedido ao setor certo** por meio de um formulário estruturado, evitando que solicitações se percam.
- **Permite atualizar a agenda sem editar código**, através de um painel administrativo simples, protegido por um endereço de acesso não divulgado publicamente.

## Funcionalidades

- **Início** — apresentação da paróquia, história em linha do tempo, valores da comunidade, seção sobre o padroeiro (São João Evangelista) e um resumo das últimas notícias.
- **Eventos** — agenda pública de missas e celebrações, com filtro por categoria (missas especiais, celebrações, pastorais e grupos) e painel administrativo (oculto) para publicar ou remover eventos.
- **Contato** — dados da secretaria paroquial e lista de pastorais/movimentos, cada uma com link direto de WhatsApp e nome do responsável.
- **Doações** — formas de contribuição financeira (Pix com botão de copiar, cartão, transferência bancária) e de itens (roupas, alimentos não perecíveis), além de perguntas frequentes.
- **Solicitação** — formulário próprio para enviar dúvidas, pedidos ou mensagens, com escolha do setor de destino (secretaria ou uma pastoral específica).
- **Acesso administrativo** — área de login em um endereço não divulgado nos menus do site, usada apenas para gerenciar a agenda de eventos.

## Documentação

### 1. Estrutura de pastas

```
psje-fusao/
├── index.html            → Início (história, timeline, valores, padroeiro, notícias)
├── eventos.html            → Agenda pública + painel administrativo (se logado)
├── contato.html              → Secretaria e pastorais (WhatsApp)
├── doacoes.html                → Pix, cartão, transferência, itens e FAQ
├── solicitacao.html              → Formulário de solicitação
├── portal-8f3k2/
│    └── entrar.html                → Login administrativo (URL não divulgada)
├── robots.txt                        → Impede indexação da pasta administrativa
├── assets/
│    ├── css/
│    │    ├── reset.css                 → Reset de estilos, em arquivo próprio
│    │    └── style.css                  → Tokens de cor/tipografia e componentes
│    └── js/
│         ├── main.js                      → Menu mobile, ano do rodapé, notícias
│         ├── eventos.js                     → Agenda, filtros, painel admin
│         ├── contato.js — não existe          → contato.html não tem formulário
│         ├── doacoes.js                         → Copiar chave Pix
│         ├── solicitacao.js                       → Validação e envio do formulário
│         └── entrar.js                              → Login de demonstração
└── README.md
```

O cabeçalho, o menu mobile e o rodapé são repetidos em cada página HTML, de propósito: assim o site funciona abrindo o arquivo direto no navegador (`file://`), sem depender de servidor local ou de `fetch()`, que seria bloqueado por CORS nesse cenário.

### 2. Como abrir

Não é necessário instalar nada. Abra `index.html` diretamente no navegador. Para publicar de verdade (domínio próprio, HTTPS), basta subir a pasta inteira em qualquer serviço de hospedagem de site estático.

### 3. Conteúdo de exemplo — trocar antes de publicar

Vários textos foram preenchidos com dados plausíveis, mas fictícios, para o site parecer completo. Procure por comentários `<!-- EDITAR: ... -->` no HTML e troque pelos dados reais:

- Texto de "Nossa história" e a linha do tempo, em `index.html`
- Números de WhatsApp da secretaria e das pastorais (todos no padrão `...900000000`), em `contato.html`
- Chave Pix e dados bancários, em `doacoes.html`
- Endereço, telefone e e-mail (repetidos no rodapé de todas as páginas)
- Os 6 eventos de exemplo em `assets/js/eventos.js` (constante `SEED_EVENTS`)
- Links de Instagram, Facebook e WhatsApp nos botões flutuantes (rodapé de cada página)

### 4. Área administrativa — como funciona e seus limites

A gestão da agenda de eventos fica em `/portal-8f3k2/entrar.html`. Esse endereço:

- **Não aparece em nenhum menu, rodapé ou link do site público** — só quem souber a URL (ou tiver o favorito salvo) consegue chegar até ela.
- **Está bloqueado para buscadores** via `robots.txt` e `<meta name="robots" content="noindex, nofollow">` na própria página.
- **Usa um login de demonstração**, verificado inteiramente no navegador (`assets/js/entrar.js`):
  - usuário: `admin`
  - senha: `psje2026`

**Importante:** isso é ocultação de URL, não é segurança de verdade. Usuário e senha ficam em texto simples dentro de um arquivo JavaScript que qualquer pessoa pode ler abrindo "Ver código-fonte" no navegador — mesmo sem saber a URL de antemão, alguém que a descubra (por exemplo, por um link compartilhado por engano) tem acesso total. Uma sessão "logada" também é apenas uma marcação salva no `localStorage` do navegador, sem validação nenhuma do lado do servidor. Antes de usar este portal fora de uma demonstração/protótipo, essa parte precisa virar autenticação real, no servidor.

Com a sessão ativa, `eventos.html` libera um formulário para publicar e remover eventos. Esses eventos ficam salvos apenas no `localStorage` do navegador de quem está logado — ou seja, um evento adicionado não aparece automaticamente para outros visitantes em outros dispositivos. Para virar um sistema de verdade, a agenda precisaria de um banco de dados no servidor.

### 5. Acessibilidade

- Link "Pular para o conteúdo" (`skip-link`) no topo de cada página, para navegação por teclado.
- Contraste de cor verificado entre texto e fundo nas combinações usadas.
- `:focus-visible` com contorno bem visível em todos os elementos interativos.
- `prefers-reduced-motion` respeitado (anima menos para quem configurou isso no sistema).
- Mensagens de status de formulário com `role="status"` e `aria-live="polite"`, para leitores de tela anunciarem sucesso/erro automaticamente.
- Todo conteúdo dinâmico inserido via JavaScript (títulos e descrições de eventos) passa por uma função de escape de HTML antes de ser exibido, evitando que um texto malicioso seja executado como código na página.

### 6. Limitações conhecidas (protótipo)

- **Sem back-end real**: os formulários de Solicitação e de login administrativo não enviam dados a lugar nenhum — apenas validam e simulam uma confirmação.
- **Agenda de eventos por navegador**: como descrito acima, o `localStorage` não sincroniza entre dispositivos.
- **Login sem segurança real de servidor**: ver seção 4.

### 7. Próximos passos sugeridos (fora do escopo deste protótipo)

- Back-end com autenticação real e banco de dados para eventos e solicitações.
- Envio de e-mail de verdade a partir do formulário de Solicitação (ex.: Formspree, EmailJS ou um serviço de e-mail transacional).
- Painel administrativo mais completo (editar evento existente, gerenciar pastorais e conteúdo da Home sem editar código).
