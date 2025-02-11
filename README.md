# User Service

## 📌 Descrição do Projeto
O **user-service** é um microserviço responsável pelo gerenciamento de usuários. Ele permite a criação, atualização, busca e exclusão de usuários, além de fornecer endpoints para listar todos os usuários.

## 🚀 Funcionalidades
- Criação de novos usuários
- Atualização de informações de usuários existentes
- Busca de usuários por ID ou CPF
- Listagem de todos os usuários
- Exclusão de usuários

## 🏗️ Estrutura do Projeto
```
user-service
│── coverage
│── docker
│   └── Dockerfile_node
│── node_modules
│── src
│   ├── application
│   │   ├── controllers  # Controladores das rotas
│   │   ├── usecases  # Casos de uso do sistema
│   │   ├── utils  # Funções auxiliares
│   ├── domain
│   │   ├── entities  # Entidades principais do domínio
│   ├── infrastructure
│   │   ├── config  # Configurações gerais
│   │   ├── external  # Comunicação com serviços externos
│   │   ├── mappers  # Mapeamento entre entidades e models
│   │   ├── routes  # Definição das rotas da API
│   ├── interfaces  # Gateways para interação entre camadas
│   ├── types  # Definições de tipos para o TypeScript
│── .env  # Configuração de variáveis de ambiente
│── docker-compose.yml  # Configuração do Docker
│── package.json  # Dependências do projeto
│── README.md  # Documentação do projeto
```

## ⚙️ Tecnologias Utilizadas
- **Node.js** (TypeScript)
- **Express.js** (Framework para API)
- **Sequelize** (ORM para PostgreSQL)
- **Docker** (Contêinerização do serviço)

## 🛠️ Configuração e Execução

### 📌 **Pré-requisitos**
Antes de rodar o projeto, garanta que você tenha instalado:
- **Docker** e **Docker Compose**
- **Node.js** (versão LTS recomendada)

### 🚀 **Passo 1: Configuração do .env**
Crie um arquivo **.env** na raiz do projeto e adicione:
```
DATABASE_URL=postgres://user:password@postgres-db:5432/user-service
APP_URL=http://localhost:3001
```

### 🚀 **Passo 2: Subir o serviço com Docker**
```sh
docker-compose up --build
```
Isso iniciará o serviço junto com o banco de dados PostgreSQL.

### 🚀 **Passo 3: Rodar localmente (sem Docker)**
Caso queira rodar manualmente sem Docker:
```sh
npm install
npm run dev
```

## 📌 **Principais Endpoints**

### 📤 **Criação de Usuário**
```http
POST /user/create
```
**Body (application/json):**
```json
{
  "cpf": "12345678901",
  "name": "John Doe",
  "username": "johndoe",
  "password": "password123"
}
```

### 🔍 **Buscar Usuário por ID**
```http
GET /user/id/:id
```

### 🔍 **Buscar Usuário por CPF**
```http
GET /user/search/:cpf
```

### 📋 **Listar Todos os Usuários**
```http
GET /user/all
```

### 📝 **Atualizar Usuário**
```http
PUT /user/update/:id
```
**Body (application/json):**
```json
{
  "name": "John Doe Updated",
  "username": "johndoeupdated",
  "password": "newpassword123"
}
```

### 🗑️ **Excluir Usuário**
```http
DELETE /user/delete/:id
```
---
### Evidência de Coverage do Projeto
![user_service](https://github.com/user-attachments/assets/dfeeb5b3-d799-4375-a664-3f953f48366e)

---
## 📩 Contato
Caso tenha dúvidas ou sugestões, entre em contato pelo repositório!

---

### 🚀 **Desenvolvido para o Tech Challenge FIAP**
