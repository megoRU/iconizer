# Iconizer

Iconizer is a fully client-side React, TypeScript and Vite web service for creating icon packs from one source image. It generates real PNG files, a multi-size ICO file and a ZIP archive in the browser. Images are never uploaded to a server.

## Features

- Drag and drop upload, file picker and clipboard paste.
- PNG, JPEG, WebP and GIF source images. GIF processing uses the first decoded frame.
- Default PNG sizes: 16, 32, 48, 64, 96, 128, 256, 512 and 1024 px.
- Custom sizes from 1 to 4096 px.
- Cover, contain and stretch fitting with cover position controls.
- True multi-image ICO generation with 16, 24, 32, 48, 64, 128 and 256 px entries.
- ZIP export with grouped folders or all files in the root.
- Light, dark and system themes stored in `localStorage`.
- Russian and English localization stored in `localStorage`.
- PWA manifest and service worker for offline use after the first visit.

## Development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

The build command creates a static site in `dist/`.

## Deployment

### Vercel

1. Import the repository in Vercel.
2. Use `npm run build` as the build command.
3. Use `dist` as the output directory.
4. Deploy as a static frontend project.

### Cloudflare Pages

1. Create a Pages project from the repository.
2. Set the build command to `npm run build`.
3. Set the build output directory to `dist`.
4. Deploy. No server or functions are required.

### Nginx

1. Run `npm install` and `npm run build`.
2. Copy the contents of `dist/` to your Nginx web root.
3. Serve the app with a static configuration:

```nginx
server {
    listen 80;
    server_name example.com;
    root /var/www/iconizer/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```
