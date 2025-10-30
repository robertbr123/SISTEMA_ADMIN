# Deploy em cPanel (Next.js + Prisma + Node)

Este projeto usa Next.js (App Router) e Prisma com SQLite. Para rodar em cPanel, seu plano precisa suportar Node.js (Application Manager/Passenger). Em hospedagens que não suportam Node, apenas o `next export` funcionaria (estático), mas neste projeto há APIs e integrações (Mikrotik/Proxmox), então precisa de Node.

## Pré-requisitos
- cPanel com suporte a Node.js (Application Manager / Phusion Passenger)
- Node 18+ disponível
- Permissão de saída para as portas dos serviços que você integra (Proxmox 8006 HTTPS, Mikrotik API 8728/8729, etc.)

## Passo a passo

1) Suba os arquivos para o servidor
- Envie todo o código do projeto para uma pasta do seu usuário, por exemplo: `~/apps/sistema`
- Inclui `server.js` (custom server) e `package.json`

2) Crie o app Node no cPanel
- Acesse cPanel > Setup Node.js App (Application Manager)
- Create Application
  - Application mode: Production
  - Node.js version: 18+ (ou a maior disponível)
  - Application root: `apps/sistema`
  - Application URL: escolha o domínio/subdomínio/pasta
  - Application startup file: `server.js`
- Salve a app (ele criará um virtualenv e um `.htaccess` para Passenger)

3) Instale dependências no servidor
- Abra o Terminal do cPanel (ou SSH) e vá até a pasta da app:
```
cd ~/apps/sistema
npm ci
```

4) Configurar variáveis de ambiente no cPanel
- Ainda na tela do Node App no cPanel, adicione as variáveis (Environment Variables):
  - NEXTAUTH_URL, NEXTAUTH_SECRET
  - DATABASE_URL (se alterar de SQLite)
  - PROXMOX_API_URL, PROXMOX_USER, PROXMOX_TOKEN_ID, PROXMOX_TOKEN_SECRET, PROXMOX_INSECURE
  - Outras do Mikrotik/Cloudflare/cPanel se usadas
- Clique em Save/Update para aplicar

5) Preparar banco (Prisma)
- Se for usar o SQLite mesmo (padrão), o arquivo fica em `prisma/dev.db`. Garanta permissões de escrita.
- Execute:
```
npx prisma generate
npx prisma migrate deploy
```
  - Se você não usa migrations ainda, pode usar `npx prisma db push` para sincronizar o schema.

6) Build de produção e start
```
npm run build
# Passenger chamará "node server.js" conforme Startup file
# Se preferir rodar manualmente:
# npm run start:server
```
- No painel do cPanel, clique em Restart App após o build.

7) Logs
- No Application Manager, há um link para logs (Passenger). Use também `console.log` no server/app para ajudar.

## Observações importantes
- Build no servidor: por usar Prisma, é mais seguro construir no mesmo SO do servidor (evita mismatch do engine). Por isso faça `npm ci` e `npm run build` diretamente no cPanel/SSH.
- Certificados Proxmox: se for self-signed, defina `PROXMOX_INSECURE=1` e confirme que a saída é liberada.
- Mikrotik: libere conexões de saída para a porta API e permita o IP do servidor acessar os aparelhos.
- Backup do SQLite: faça backup periódico do arquivo `prisma/dev.db`.
- Alternativa: se seu cPanel não suportar Node.js, considere um VPS com Docker/PM2 ou um serviço de Node dedicado.

## Rotina de atualização
1. Suba o novo código (git pull/rsync/FTP)
2. `npm ci`
3. `npx prisma migrate deploy` (ou `db push` se for o caso)
4. `npm run build`
5. Restart App no cPanel
