# LP Express Estética · Helena Vasconcelos

Landing page em Astro com textos e imagens editáveis pelo Sveltia CMS (`/admin/`).
Base: [criativiarte/astro-sveltia-cms-template](https://github.com/criativiarte/astro-sveltia-cms-template), sem o blog.

## Comandos

```bash
npm install
npm run dev      # http://localhost:4321
npm run check
npm run build
```

## Onde fica cada coisa

| Caminho | O que é |
|---|---|
| `src/content/data/home.json` | Todos os textos e imagens da página (editado pelo CMS) |
| `src/content/data/settings.json` | Título/descrição do site, logos, WhatsApp, redes sociais, Maps |
| `src/content.config.ts` | Schema do conteúdo (valida o JSON no build) |
| `src/assets/images/` | Imagens do CMS. O Astro gera WebP em vários tamanhos no build |
| `src/assets/decor/` | Arabescos decorativos extraídos do Figma (não editáveis pelo CMS) |
| `src/components/sections/` | Uma seção por arquivo, na ordem da página |
| `src/components/ui/Button.astro` | As 5 variantes de botão do layout |
| `src/styles/global.css` | Tokens de cor, fontes e tipografia |
| `public/admin/config.yml` | Configuração do Sveltia CMS |

## Tokens do Figma

Cores: `#528E8A` teal, `#3A8378` teal-deep, `#CDD9C6` sage, `#FFFEFA` cream, `#EAEBE5` mist,
`#ECE9E4` sand, `#E9E2D3` linen, `#786C66` taupe (texto), `#4C4C4C` graphite (títulos), `#ADADAD` silver, `#0195F6` instagram.

Fontes (self-hosted via Fontsource, sem depender do Google Fonts no build):

- **Libertinus Math**: títulos (70/40/30px desktop; 36/26px mobile)
- **Montserrat** 400/500/700: textos e botões
- **Open Sans** 400/700: bloco de perfil do Instagram
- **Raleway** 400: linha de copyright

Breakpoint único em 1024px: abaixo segue o layout mobile (360px), acima o desktop (1440px).

## Configurar o CMS

1. Em `public/admin/config.yml`, troque `repo`, `branch` e `site_url`.
2. Em `astro.config.mjs`, troque `site`.
3. Crie um fine-grained token no GitHub (Contents: Read and write; Metadata: Read) só para este repositório e entre em `/admin/` com ele.

Cada edição no painel gera um commit; o workflow em `.github/workflows` faz build e deploy.

## Imagens pelo CMS

O CMS grava caminhos como `/src/assets/images/foto.jpg`. O schema converte para caminho relativo e o Astro otimiza.
Os recortes (arco do hero, cantos arredondados, degradês) são feitos em CSS, então basta enviar a foto normal.
