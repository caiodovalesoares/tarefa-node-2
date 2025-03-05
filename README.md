Este projeto é uma aplicação backend desenvolvida em Node.js utilizando o framework Fastify. A aplicação implementa funcionalidades de autenticação, criação de posts, comentários e likes, permitindo que os usuários interajam com o conteúdo de maneira segura e eficiente, como em uma rede social.

Principais Tecnologias Utilizadas:
- Node.js: Plataforma de desenvolvimento backend.
- Fastify: Framework web rápido e eficiente para Node.js.
- Prisma: ORM (Object-Relational Mapping) para interagir com o banco de dados.
- JWT (JSON Web Token): Para autenticação e autorização de usuários.
- Zod: Biblioteca de validação de esquemas para garantir a integridade dos dados.
  
Funcionalidades Implementadas:

Autenticação de Usuários:
- Registro e login de usuários.
- Geração de tokens JWT para autenticação.
- Middleware para verificação de tokens JWT em rotas protegidas.
  
Gerenciamento de Posts:
- Criação, leitura, atualização e exclusão de posts.
- Associação de posts a usuários autenticados.
  
Gerenciamento de Comentários:
- Criação de comentários em posts.
- Associação de comentários a usuários autenticados e posts específicos.

Sistema de Likes:
- Criação de likes que podem ser atribuídos tanto a posts quanto a comentários.
- Associação de likes a usuários autenticados.
