# 🔑 Configuração da API Key do Pokémon TCG

## ✅ Sua chave de API:
```
c2a8a24b-0d4f-4afd-b985-4a91788092bc
```

## 📁 Como configurar:

### **Opção 1: Criar arquivo .env.local (Recomendado)**
Crie um arquivo chamado `.env.local` na raiz do projeto com o conteúdo:

```bash
VITE_POKEMON_TCG_API_KEY=c2a8a24b-0d4f-4afd-b985-4a91788092bc
```

### **Opção 2: Usar variável de ambiente do sistema**
No Windows (PowerShell):
```powershell
$env:VITE_POKEMON_TCG_API_KEY="c2a8a24b-0d4f-4afd-b985-4a91788092bc"
npm run dev
```

## 🔧 **O que foi configurado:**

✅ **Repositório principal** - usa sua chave de API  
✅ **Hook alternativo** - fallback com sua chave  
✅ **Componente de teste** - testa com sua chave  
✅ **Chave hardcoded** como fallback se não encontrar a variável  

## 🚀 **Para testar:**

1. **Crie o arquivo `.env.local`** com a chave acima
2. **Execute:** `npm run dev`
3. **Verifique** os componentes de debug na página inicial

## 📊 **Resultado esperado:**

- ✅ **API oficial funcionando** com suas cartas reais
- ✅ **Carrossel populado** com cartas do Pokémon TCG
- ✅ **Debug mostrando** "official" como fonte
- ✅ **Imagens reais** das cartas carregando

## 🔍 **Debug no console:**

Abra o DevTools (F12) e veja os logs:
- `🎯 Carrossel usando fonte: official`
- `✅ API oficial funcionando: [dados das cartas]`

## ⚠️ **Importante:**

- Mantenha sua chave **segura** e **não compartilhe** em repositórios públicos
- A chave está **hardcoded** como fallback apenas para desenvolvimento
- Para produção, sempre use variáveis de ambiente

## 📈 **Limites da API:**

Segundo o [Pokémon TCG Developer Portal](https://dev.pokemontcg.io/dashboard):
- **Mais de 1 milhão** de requisições por semana
- **Rate limits** mais altos com autenticação
- **Acesso completo** a todos os dados das cartas
