# Cognix

Cognix detects GTM fragmentation before it becomes revenue risk.

This repo contains the current Cognix website and product demo. The product flow is built around a user adding messy GTM signals, running a Cognix readout, seeing the main GTM contradiction, reviewing evidence, understanding revenue risk, and getting a recommended leadership decision.

## File structure

```text
index.html
product.html
src/
styles/
data/
README.md
```

- `index.html` is the marketing homepage.
- `product.html` is the Cognix product/readout demo.
- `src/` contains the JavaScript app logic and Supabase client.
- `styles/` contains the homepage and product CSS.
- `data/` contains sample GTM signal data for the Cognix demo.

## Run locally

```bash
npm install
npm run dev
```

Then open:

```text
http://127.0.0.1:5173/
http://127.0.0.1:5173/product.html
```

If using the current preview server, the app may also be available at:

```text
http://127.0.0.1:4173/
http://127.0.0.1:4173/product.html
```

## Product promise

Cognix turns scattered GTM signals into a leadership-ready readout:

```text
Signal -> contradiction -> root cause -> business consequence -> revenue risk -> recommended decision
```

The current demo uses local deterministic inference by default. OpenAI inference is optional.
