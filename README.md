# Sistema de Assinaturas Recorrentes - Ondeline

Este é um sistema web para a Ondeline, provedor de internet, gerenciar assinaturas recorrentes, permitindo vender planos de internet e receber pagamentos automáticos mensalmente.

## Tecnologias Usadas
- **Next.js**: Framework React para aplicações web.
- **TypeScript**: Para tipagem estática.
- **Tailwind CSS**: Para estilização.
- **Stripe**: Para processamento de pagamentos recorrentes.

## Como Configurar e Executar

### 1. Instalar Node.js
Se você não tem Node.js instalado, baixe e instale a versão mais recente do site oficial: [nodejs.org](https://nodejs.org/).

### 2. Instalar Dependências
Abra o terminal no diretório do projeto e execute:
```
npm install
```

### 3. Configurar Stripe
- Crie uma conta no [Stripe](https://stripe.com/).
- Obtenha suas chaves API (Publishable Key e Secret Key).
- Crie um arquivo `.env.local` na raiz do projeto e adicione:
```
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

### 4. Configurar Banco de Dados
Execute os comandos para configurar o Prisma:
```
npx prisma generate
npx prisma db push
```

### 6. Executar o Projeto
```
npm run dev
```
Acesse http://localhost:3000 no navegador.

## Funcionalidades Planejadas
- Página inicial com links para planos, login e dashboard.
- Sistema de autenticação real com NextAuth.js e banco de dados Prisma/SQLite.
- Planos de assinatura com preços.
- Dashboard completo do cliente com:
  - Resumo da assinatura (plano, valor, status, uso de dados) baseado em dados reais.
  - Histórico de faturas com opção de download.
  - Seção de suporte para abrir chamados.
  - Configurações da conta editáveis (nome, email) salvas no banco.
  - Logout seguro.
- Integração com Stripe para pagamentos recorrentes.
- Páginas de sucesso após pagamento.

## Próximos Passos
- Criar assinaturas via Stripe e salvar no banco.
- Implementar edição de dados de pagamento e endereço.
- Adicionar sistema de tickets de suporte.
- Integrar webhooks do Stripe para atualizar status automaticamente.
- Implementar notificações por email.

Para dúvidas ou personalizações, entre em contato.