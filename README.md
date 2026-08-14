# Connor Norman Walker

This mirrors the Bimbo Books setup: two separate applications.

- `web/` is the public Next.js site. Deploy this folder to Netlify.
- `studio/` is the Sanity Studio. Run and deploy it separately.

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
