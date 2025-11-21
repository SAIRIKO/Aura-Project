# Aura-Project
Aura é um projeto acadêmico desenvolvido por estudantes do 8º semestre da Universidade Católica de Brasília (UCB). O projeto propõe a criação de um marketplace voltado para farmácias, implementado por meio de um aplicativo móvel (APP) que visa facilitar o acesso a produtos farmacêuticos e promover uma experiência de compra mais prática e integrada.

## Como rodar os testes (backend)

Requisitos mínimos:
- Node.js (recomendado 18.x ou superior)
- npm (vem com o Node.js)

Passos rápidos (PowerShell):

1. Abra o terminal na pasta do projeto e entre na pasta `backend`:

```powershell
cd C:\Users\MuriloCauaBarrosCarr\Downloads\Aura\Aura-Project\backend
```

2. Instale dependências:

```powershell
npm install
```

3. Executar os testes:

- Rodar todos os testes em modo watch:
```powershell
npx vitest
```
- Rodar todos os testes uma vez (não-watch):
```powershell
npx vitest run
```
- Rodar só os unitários:
```powershell
npm run test:unit
```
- Rodar só as integrações:
```powershell
npm run test:integration
```

Observação:
- Os testes usam `dotenv` para carregar variáveis de ambiente (arquivo `.env`). Certifique-se de ter um `.env` com quaisquer segredos necessários (ex.: `JWT_SECRET`) se você estiver rodando testes que dependam dessas variáveis.

## Como rodar o backend e o frontend

Observação: execute o backend antes do frontend para que a API esteja disponível para o aplicativo.

Backend (API)

1. Entre na pasta `backend`:

```powershell
cd C:\Aura-Project\backend
```

2. Instale dependências e configure `.env` (crie a partir de um exemplo se houver ` .env.example`):

```powershell
npm install
# copie .env.example para .env e ajuste variáveis (ex.: JWT_SECRET, SUPABASE_URL, SUPABASE_SERVICE_ROLE)
```

3. Rodar em modo de desenvolvimento (Hot reload):

```powershell
npm run dev
```

4. Alternativa: compilar e executar em produção:

```powershell
npm run build
npm start
```

Frontend (App - Expo)

1. Entre na pasta `App`:

```powershell
cd C:\Aura-Project\App
```

2. Instale dependências:

```powershell
npm install
```

3. Instale dependências nativas recomendadas (uma vez):

```powershell
npx expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-masked-view/masked-view
```

4. Inicie o Metro bundler (modo recomendado se o dispositivo estiver na mesma rede):

```powershell
npx expo start
```

5. Se o dispositivo não estiver na mesma rede, use o modo `tunnel`:

```powershell
npx expo start --tunnel
```

6. Configurar a URL da API no app: verifique `App/api.config.ts` ou a constante que define `API_URL` e ajuste para `http://localhost:4000` (ou para a URL/porta onde o backend está rodando). Se usar um dispositivo físico via Tunnel, ajuste para o endereço público fornecido pelo Expo ou para a URL do seu servidor.

Problemas comuns
- Se faltar algum asset, crie placeholder em `App/assets` (por exemplo `icon.png`).
- Se encontrar erro de módulo nativo (ex.: `react-native-gesture-handler`), execute `npx expo install <package>` conforme a lista acima.


