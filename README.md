# WebChat FURIA

## 🚀 Funcionalidades Implementadas

1. **Interface de Chat**:
   - Permite interagir com o Grupo Furioso (com funcionalidade de loop de conversas).
   - Criar conversa entre o usuário e um assistente virtual, caracterizado pelos jogadores da FURIA. (Botão "+ Converse com os jogadores") 
   - Respostas do assistente customizadas com base no jogador, utilizando o LLM LLaMA3 localmente.

2. **Tecnologias Utilizadas**:
   - **Next.js**: Framework React para desenvolvimento escalável.
   - **TypeScript**: Para código mais seguro e gerenciável.
   - **Tailwind CSS** e **shadcn/ui**: Para estilização moderna e componentes reutilizáveis.
   - **LLaMA3**: o Ollama LLaMA 3 é um modelo de linguagem.
---

## 🛠️ Instalação e Execução

### Pré-requisitos
Ter instalado:
- **Node.js**
- **npm** ou **yarn**
- **Ollama**

### Passos para Configuração
1. **Clone o repositório**:
   ```bash
   git clone https://github.com/matheusouzag/chat-furia.git

2. **Instale as dependências:**:
   ```bash
   npm install

3. **Instalação do Ollama**:
   Acessando o link: https://ollama.com/download
   Após isso basta abrir o terminal e executar o seguinte comando (o modelo possui 5GB):
   ```bash
   ollama pull llama3

4. **Inicie o localhost (Abra http://localhost:3000 no navegador)**:
   ```bash
   npm run dev

## 🧱 Arquitetura do Projeto

O projeto foi estruturado garantindo escalabilidade e organização, seguindo a seguinte estrutura:

1. **public/images**: Para organização de imagens
2. **src/app**: Contendo a estrutura principal do chat
3. **src/components**: Com os seguintes Componentes utilizados:
   - Contacts: Para os Contatos
   - Control: Para botões utilizados
   - Header/Footer: Para complementar o chat
   - Message: Para os balões de texto
4. **src/pages/api/chat.ts**: Local que esta configurado nosso modelo.
