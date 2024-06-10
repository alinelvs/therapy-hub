
# Therapy Hub

## Descrição do Projeto

Este projeto é uma aplicação web desenvolvida com Angular que tem como objetivo fornecer uma plataforma para agendamento de consultas com especialistas em terapia. A aplicação consome dados de uma API simulada e apresenta funcionalidades como visualização de informações dos especialistas, agendamento de consultas e responsividade para diferentes dispositivos.

## Requisitos do Projeto

### Funcionalidades Implementadas

- **Frontend Moderno**: Implementação usando Angular.
- **Solicitações HTTP**: Todos os dados são obtidos através de solicitações HTTP para um servidor simulado usando JSON Server.
- **Casos Especiais e Viewports**: A aplicação é responsiva e lida com diferentes tamanhos de tela, garantindo uma boa experiência de usuário em dispositivos móveis e desktop.

### O que foi Considerado

- **Organização do Código**: O código está organizado de maneira modular, facilitando a manutenção e a escalabilidade.
- **Padrões de Código**: Seguidos os padrões de código do Angular e boas práticas de desenvolvimento.
- **Boas Práticas de Projeto**: Componentização, uso de serviços para lógica de negócios, separação de responsabilidades, lazy loading e prevenção de memory leaks.
- **Documentação**: Este documento serve como guia para instalação, execução e testes do projeto.
- **Testes Unitários**: Implementação de testes unitários utilizando Jest para garantir a qualidade do código.
- **Responsividade**: Utilização do Tailwind CSS e Angular Material para garantir um design responsivo e moderno.
- **Bibliotecas**: Integração com Tailwind Material para componentes estilizados.

## Estrutura do Projeto

- **src/app**: Contém os componentes, serviços e módulos da aplicação.
- **src/assets**: Imagens e outros recursos estáticos.
- **src/environments**: Configurações de ambiente para desenvolvimento e produção.

## Como Executar o Projeto

### Pré-requisitos

- Node.js e npm instalados
- Angular CLI instalado globalmente
- JSON Server instalado globalmente

  Para instalar o JSON Server globalmente, use o comando:
    ```sh
    npm install -g json-server
    ```

### Instalação

1. Clone o repositório:
    ```sh
    git clone https://github.com/alinelvs/therapy-hub.git
    cd therapy-hub
    ```

2. Instale as dependências:
    ```sh
    npm install
    ```

3. Inicie a aplicação Angular e o servidor JSON simultaneamente:
    ```sh
    npm run start:all
    ```

### Executando a Aplicação

- A aplicação estará disponível em `http://localhost:4200`.
- A API simulada estará disponível em `http://localhost:3000`.

## Usuário Padrão para Login

Utilize as seguintes credenciais para fazer login no sistema:
- **Email:** usuario@gmail.com
- **Senha:** 123456

## Como Executar os Testes

### Testes Unitários

- Para executar os testes unitários, use o comando:
    ```sh
    npm run test
    ```

- Para executar os testes em modo watch, use o comando:
    ```sh
    npm run test:watch
    ```

## Ferramentas e Tecnologias Utilizadas

- **Angular**: Framework principal para desenvolvimento do frontend.
- **Tailwind CSS**: Utilizado para estilização e responsividade.
- **Angular Material**: Utilizado para componentes UI modernos e acessíveis.
- **Tailwind Material**: Biblioteca que combina a simplicidade do Tailwind CSS com os componentes do Material Design.
- **Jest**: Ferramenta de testes utilizada para garantir a qualidade do código.
- **JSON Server**: Servidor simulado para fornecimento de dados via HTTP.

## Considerações Finais

Este projeto foi desenvolvido com foco em boas práticas de desenvolvimento, organização de código e responsividade. O esperado é que a aplicação demonstre capacidade de construir interfaces modernas e funcionais, além de garantir a manutenibilidade e escalabilidade do código.
