# 🤖 Chatbot com Contexto

Um chatbot inteligente construído com Next.js que permite fazer upload de documentos para fornecer contexto às conversas. O sistema utiliza diferentes modelos de IA através da OpenRouter para gerar respostas baseadas no conteúdo dos documentos carregados.

## 🚀 Tecnologias Utilizadas

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática para melhor desenvolvimento
- **Tailwind CSS** - Estilização utilitária
- **OpenRouter API** - Integração com múltiplos modelos de IA
- **React Icons** - Ícones para a interface
- **Radix UI** - Componentes acessíveis
- **React Markdown** - Renderização de markdown nas respostas

## 🏗️ Decisões Técnicas

### Arquitetura

- **Context API**: Gerenciamento centralizado do estado da aplicação
- **Custom Hooks**: Separação da lógica de negócio (`useChats`)
- **Componentes Modulares**: Interface dividida em componentes reutilizáveis
- **Local Storage**: Persistência de chats e configurações do usuário

### Funcionalidades Principais

- **Upload de Contexto**: Suporte para arquivos `.md` e `.txt`
- **Múltiplos Modelos**: Integração com GPT-4o Mini, Mistral, Llama, phi-3 mini 128k
- **Histórico de Conversas**: Sistema de chats persistente
- **Exportação**: Funcionalidade para exportar conversas em JSON ou TXT
- **Interface Responsiva**: Design adaptável para desktop e mobile

### Segurança

- **Variáveis de Ambiente**: Chaves de API protegidas
- **Validação de Arquivos**: Aceita apenas formatos seguros
- **Sanitização**: Tratamento seguro do conteúdo dos documentos

## 📋 Pré-requisitos

- Node.js 18+
- npm, yarn ou pnpm
- Conta na [OpenRouter](https://openrouter.ai/) para obter API key

## 🔧 Instalação e Configuração

### 1. Clone o repositório

```bash
git clone <url-do-repositorio> //adicionar url do repositorio
cd desafio-dev-front
```

### 2. Instale as dependências

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
OPENROUTER_API_KEY=sua_chave_api_aqui
```

### 4. Obtenha sua API Key

1. Acesse [OpenRouter](https://openrouter.ai/)
2. Crie uma conta ou faça login
3. Vá para "API Keys" no dashboard
4. Crie uma nova chave de API
5. Copie a chave e cole no arquivo `.env.local`

### 5. Execute o projeto

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Acesse [http://localhost:3000](http://localhost:3000) para ver a aplicação.

## 🎯 Como Usar

### Upload de Documento de Contexto

1. Clique em "Upload Document" na sidebar
2. Selecione um arquivo `.md` ou `.txt`
3. O documento será carregado e usado como contexto
4. Faça perguntas relacionadas ao conteúdo do documento

### Seleção de Modelo de IA

1. Clique no seletor de modelo na sidebar
2. Escolha entre os modelos disponíveis:
   - GPT-4o Mini (OpenAI)
   - Mistral 7B Instruct (Mistral AI)
   - Llama 3.1 8B Instruct (Meta)
   - Phi-3 Mini 128K (Microsoft)

### Gerenciamento de Conversas

- **Nova Conversa**: Clique no ícone "+" na sidebar
- **Trocar Conversa**: Clique em qualquer conversa na lista
- **Excluir Conversa**: Use o menu de três pontos
- **Exportar**: Exporte conversas em JSON ou TXT

### Link do deploy

-

## 📁 Estrutura do Projeto

```
src/
├── app/                 # App Router do Next.js
├── components/          # Componentes React
│   ├── ui/             # Componentes base (Radix UI)
│   └── ...             # Componentes específicos
├── contexts/           # Context API
├── hooks/              # Custom hooks
├── lib/                # Utilitários e configurações
├── types/              # Definições TypeScript
└── constants/          # Constantes da aplicação
```

## 🔧 Scripts Disponíveis

```bash
npm run dev          # Desenvolvimento local
npm run build        # Build de produção
npm run start        # Servidor de produção
npm run lint         # Verificação de código
```

Desenvolvido usando Next.js e OpenRouter
