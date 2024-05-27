Trivia-Quest

Este projeto é um aplicativo de trivia desenvolvido com React e Redux. Ele permite que os usuários façam login, joguem perguntas de trivia, recebam feedback e vejam o ranking dos melhores jogadores.
Índice

    Instalação
    Uso
    Componentes
    Redux
    Contribuição
    Licença

Instalação

    Instale as dependências:

    bash

npm install

Inicie o servidor de desenvolvimento:

bash

    npm start

    A aplicação estará disponível em http://localhost:3000.

Uso

A aplicação permite que os usuários:

    Façam login com nome e email.
    Joguem perguntas de trivia.
    Recebam feedback sobre o desempenho.
    Vejam o ranking dos melhores jogadores.
    Acessem a página de configurações.

Componentes
Confing

Componente de configurações que exibe o título da página de configurações.
Feedback

Componente que exibe o feedback ao jogador após o término do jogo. Mostra a pontuação total e o número de acertos.
Jogo

Componente que exibe o jogo de trivia, incluindo as perguntas e o cabeçalho.
Login

Componente de login que permite ao usuário inserir seu nome e email para iniciar o jogo.
Ranking

Componente que exibe o ranking dos melhores jogadores.
Perguntas

Componente que exibe as perguntas de trivia durante o jogo.
Header

Componente de cabeçalho exibido em várias páginas do aplicativo.
Redux
Actions

As actions definem os tipos de ações e os criadores de ações para atualizar o estado global da aplicação.
Reducers

Os reducers especificam como o estado da aplicação deve mudar em resposta às ações enviadas.
