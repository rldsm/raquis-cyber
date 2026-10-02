# Raquis Cyber

Landing Cyber independiente de Raquis, preparada para desplegarse en Vercel y embeberse dentro de raquischile.cl mediante Web Component.

## Archivos
- `index.html`: preview/landing standalone.
- `raquis-cyber.js`: componente `<raquis-cyber>`.
- `vercel.json`: headers CORS y sin caché para el JS embebible.

## Embed en raquischile.cl
```html
<raquis-cyber></raquis-cyber>
<script src="https://raquis-cyber.vercel.app/raquis-cyber.js" defer></script>
```

## Links de compra
El componente acepta un atributo por promoción:
- buy-quiro-10
- buy-quiro-4
- buy-kine-10
- buy-kine-5
- buy-maso-8
- buy-maso-4
- buy-ondas-5
- buy-gift-maso
- buy-gift-quiro

Ejemplo:
```html
<raquis-cyber buy-quiro-10="https://..."></raquis-cyber>
```

## Google Reviews
Existe un slot `google-reviews` para insertar el widget/script real de reseñas cuando esté disponible.
