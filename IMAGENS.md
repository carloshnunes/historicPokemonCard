# 📸 Guia de Imagens do Site

## 🎯 Onde colocar as imagens:

### **1. Favicon (ícone da aba do navegador)**
```
public/favicon.ico
```
- **Formato:** `.ico` (recomendado) ou `.png`
- **Tamanho:** 16x16, 32x32, 48x48 pixels
- **Geradores online:** [favicon.io](https://favicon.io/) ou [realfavicongenerator.net](https://realfavicongenerator.net/)

### **2. Ícone do Pokémon (header)**
```
public/pokemon-icon.svg
```
- **Formato:** `.svg` (escalável) ou `.png`
- **Tamanho:** 32x32 pixels
- **Uso:** Aparece no cabeçalho do site

### **3. Logo completo (se necessário)**
```
public/logo.svg
```
- **Formato:** `.svg` ou `.png`
- **Tamanho:** ~200x60 pixels
- **Uso:** Logo completo com texto

### **4. Imagens das cartas Pokémon**
As imagens das cartas são carregadas automaticamente da API Pokemon TCG, mas você pode adicionar imagens customizadas em:
```
public/images/
├── cards/
│   ├── placeholder.png
│   └── error-fallback.png
└── sets/
    └── set-logos/
```

## 🛠️ Como personalizar:

### **Opção 1: Substituir arquivos existentes**
1. Baixe ou crie sua imagem
2. Renomeie para o nome correto
3. Substitua o arquivo na pasta `public/`

### **Opção 2: Criar favicon personalizado**
1. Acesse [favicon.io](https://favicon.io/)
2. Faça upload da sua imagem
3. Baixe o arquivo `favicon.ico`
4. Substitua `public/favicon.ico`

### **Opção 3: Criar ícone SVG personalizado**
1. Use um editor como [Figma](https://figma.com/) ou [SVG-Edit](https://svgedit.netlify.app/)
2. Crie um ícone simples do Pokémon
3. Exporte como SVG
4. Substitua `public/pokemon-icon.svg`

## 🎨 Sugestões de design:

### **Favicon:**
- Pokéball simples
- Cores: Vermelho (#FF0000) e branco
- Estilo minimalista

### **Ícone do header:**
- Pokéball ou símbolo do Pokémon
- Cores que combinem com o tema
- Legível em tamanho pequeno

### **Logo:**
- "Histórico Pokémon" + ícone
- Fonte legível
- Cores do tema (azul #3B82F6, vermelho #FF0000)

## 🔧 Fallbacks configurados:
- Se a imagem não carregar, o ícone Lucide será exibido
- Placeholder para cartas sem imagem
- Suporte a múltiplos formatos (.ico, .svg, .png)
