# Connor Norman Walker

This mirrors the Phina setup: two separate applications with room to grow.

- `web/` is the public Next.js site. Deploy this folder to Netlify.
- `studio/` is the Sanity Studio. Run and deploy it separately.

```text
web/
├── app/
│   ├── api/
│   └── components/
├── public/
└── sanity/lib/

studio/
├── src/
│   ├── components/
│   ├── lib/
│   ├── plugins/
│   ├── schemaTypes/
│   │   ├── documents/
│   │   ├── objects/
│   │   └── singletons/
│   └── structure/
└── static/
```

Run each app in a separate terminal:

```sh
cd web
npm install
npm run dev
```

```sh
cd studio
npm install
npm run dev
```

For Netlify, set the **Base directory** to `web`.
