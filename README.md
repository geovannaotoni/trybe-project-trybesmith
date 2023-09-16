# TrybeSmith - API utilizando Typescript e Sequelize
Este projeto consiste na criação de uma loja de itens medievais, como espadas personalizadas, no formato de uma API. A linguagem utilizada foi o Typescript e o banco de dados foi gerenciado pelo Sequelize. 

O banco possui as tabelas de pessoas usuárias (users), produtos (products) e pedidos (orders). Foram desenvolvidas as camadas de Service e Controllers da aplicação, que possui endpoints para dar suporte às operações de criação, leitura e atualização de informações.

Além disso, este repositório contém os testes unitários e de integração para a API. Foram utilizadas as ferramentas Mocha, Chai e Sinon para testar os comportamentos de alguns recursos da API.

## :hammer: Dependências
As seguintes dependências já estão incluídas no arquivo package.json:
- TypeScript;
- Express;
- Nodemon;
- Sequelize;
- Sequelize-cli;
- Mysql2;
- jsonwebtoken;
- bcryptjs;
- Joi;
- Mocha;
- Chai;
- Sinon.

## :computer: Visualize este projeto:
- Instale as dependências: `npm install`
- Execute a aplicação para inicializar o container do banco de dados e da API: `docker-compose up -d`
- Abra terminal do container criado: `docker exec -it trybesmith_api bash`
- Dentro do container, rode `npm run db:reset` para criar o banco de dados, criar as tabelas e populá-las.

## :mag: Executando os testes:
Utilize o seguinte comando: `npm test:local`. Este comando irá executar os testes unitários e de integração definidos na suíte de testes, que verificarão se os comportamentos esperados estão sendo corretamente implementados na API.
Para verificar a cobertura dos testes, utilize: `npm run test:coverage`.

## :bulb: Habilidades:
A API possui as seguintes rotas:

- `POST /login`: Realiza o login do usuário e retorna um token JWT válido por 1 hora.
- `POST /products`: Cria um novo produto a partir dos dados informados.
- `GET /products`: Retorna todos os produtos registrados no banco de dados.
- `GET /orders`: Retorna todos os pedidos registrados no banco de dados.
- `POST /orders`: Cria um novo pedido a partir dos dados informados.

### Autenticação
A rota `POST /orders` exige autenticação com JWT. Para acessá-la, é necessário enviar o token JWT no header Authorization da requisição. O token JWT pode ser obtido através da rota /login. 

### Criptografia de senhas
Para garantir a segurança das senhas dos usuários, foi utilizada a biblioteca `bcryptjs` para criptografá-las antes de armazená-las no banco de dados. Isso garante que mesmo em caso de vazamento de dados, as senhas dos usuários não estarão expostas.

### Validação de dados
Para garantir que os dados enviados nas requisições estejam no formato esperado, foi utilizada a biblioteca `Joi` para realizar validações. Essa biblioteca ajuda a prevenir erros e vulnerabilidades de segurança.
