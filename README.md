# Consulta de Jogos - Frontend

Um projeto para consultar informações sobre jogos, preços, avaliações e criar lista de favoritos.

## Grupo Composto por

- DIOGO ROSSI
- FELIPE FARIAS
- GABRIEL ARAGÃO
- NICOLLAS MATSUO BATATA

## Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```bash
# RAWG API Key - necessária para buscar informações dos jogos
# Obtenha sua chave gratuita em: https://rawg.io/apidocs
VITE_RAWG_API_KEY=your_rawg_api_key_here

# URL do Backend (opcional) - deixe vazio para usar o backend em produçã
# VITE_API_BASE_URL=http://localhost:5000/api
```

### Backend

O frontend está configurado para usar o backend em produção por padrão:

- URL: https://consulta-jogos-backend-r5zr.vercel.app/
- Para desenvolvimento local, defina `VITE_API_BASE_URL` no arquivo `.env`

### Instalação e Execução

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build
```

## Funcionalidades

- 🔍 Busca de jogos usando a API RAWG
- ⭐ Sistema de favoritos (requer login)
- 💰 Consulta de preços
- 📱 Interface responsiva com Tailwind CSS
- 🔐 Autenticação de usuários
