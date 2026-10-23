# Sejiwa Digital — Website Agency

Next.js 15 (App Router) · TypeScript · Tailwind v4 · next-intl (ID/EN) · Framer Motion · GSAP ScrollTrigger · Lenis. Siap deploy ke Vercel, lead masuk ke Google Sheet lewat Google Apps Script.

## Jalankan lokal

```bash
npm install
cp .env.example .env.local   # isi nilainya
npm run dev                  # http://localhost:3000
```

Tanpa `APPS_SCRIPT_URL`, form di mode dev tetap "sukses" dan lead hanya di-log ke terminal.

## Struktur halaman

| ID (default, root)                     | EN                                  | Keterangan |
|----------------------------------------|-------------------------------------|------------|
| `/`                                    | `/en`                               | Home |
| `/layanan/pembuatan-website`           | `/en/services/web-development`      | Jasa website |
| `/layanan/iklan-digital`               | `/en/services/performance-ads`      | Google/Meta/TikTok Ads |
| `/layanan/jasa-seo`                    | `/en/services/seo`                  | SEO |
| `/layanan/full-funnel`                 | `/en/services/full-funnel`          | Paket full-funnel |
| `/tentang`                             | `/en/about`                         | Tentang |
| `/konsultasi`                          | `/en/consultation`                  | Form multi-step |
| `/terima-kasih`                        | `/en/thank-you`                     | Halaman konversi (noindex) |
| `/lp/<slug-layanan>`                   | `/en/lp/<slug>`                     | **Landing page iklan**: tanpa navbar, form di atas, noindex |

Contoh URL iklan: `https://sejiwadigital.com/lp/iklan-digital?utm_source=google&utm_medium=cpc&utm_campaign=...`

Prefill form lewat URL: `/konsultasi?layanan=SEO` atau `/konsultasi?tipe=audit`.

## Edit konten & harga

Semua copy ada di **`src/content/id.ts`** dan **`src/content/en.ts`** (harga, FAQ, testimoni, portofolio, dll). Ubah di sana, seluruh website ikut berubah.

Yang masih **PLACEHOLDER**:
- Harga "mulai dari" (bagian `offerings` & `startingFrom` tiap layanan)
- Testimoni (`testimonials.items`)
- Portofolio (`work.items`) → mockup abstrak di `src/components/home/Work.tsx`, ganti dengan screenshot asli (`/public/work/*.webp`)
- Link sosmed di `src/lib/site.ts`

Nomor WA, email, dan URL ada di `src/lib/site.ts`.

## Setup Google Sheet (Apps Script)

1. Buat Google Sheet baru (misal "Sejiwa Leads").
2. **Extensions → Apps Script**, hapus isi default, paste `apps-script/Code.gs`, simpan.
3. **Project Settings (ikon gear) → Script Properties → Add**:
   - `SECRET` = string acak panjang (contoh: hasil `openssl rand -hex 24`)
   - `NOTIFY_EMAIL` = `kontak@sejiwadigital.com`
4. **Deploy → New deployment → Select type: Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Klik Deploy, izinkan akses (Sheets + Gmail).
5. Copy **Web app URL** (berakhiran `/exec`). Buka di browser → harus muncul `{"ok":true,"service":"sejiwa-leads"}`.
6. Sheet `Leads` otomatis dibuat saat lead pertama masuk, lengkap dengan header + dropdown status (Baru → Deal/Lost).

> Kalau `Code.gs` diubah, lakukan **Deploy → Manage deployments → Edit → Version: New version** supaya URL tetap sama.

Kolom yang tercatat: data kontak, layanan, budget, timeline, halaman asal, UTM, `gclid`/`fbclid`/`ttclid`, landing page pertama, referrer. Jadi tiap lead bisa ditelusuri ke campaign-nya.

## Deploy ke Vercel

1. Push ke GitHub (repo private).
2. Vercel → **Add New Project** → import repo. Framework otomatis terdeteksi Next.js.
3. **Environment Variables** (Production + Preview):
   - `NEXT_PUBLIC_SITE_URL` = `https://sejiwadigital.com`
   - `NEXT_PUBLIC_GTM_ID` = `GTM-XXXXXXX`
   - `APPS_SCRIPT_URL` = URL `/exec` dari langkah di atas
   - `APPS_SCRIPT_SECRET` = sama dengan `SECRET` di Script Properties
4. Deploy → **Settings → Domains** → tambahkan `sejiwadigital.com` + `www`.

## Tracking (via GTM)

Website mengirim event ke `dataLayer`:

| Event             | Kapan                                   | Parameter |
|-------------------|-----------------------------------------|-----------|
| `form_start`      | Lanjut dari langkah 1 form               | `form_location` |
| `generate_lead`   | Form berhasil terkirim                   | `form_location`, `lead_services`, `lead_budget` |
| `whatsapp_click`  | Klik link WhatsApp mana pun             | `wa_location`, `page_path` |

Di GTM tinggal buat trigger **Custom Event** untuk event di atas, lalu pasang tag:
- GA4 event `generate_lead` (tandai sebagai Key Event)
- Google Ads Conversion (Lead form & WhatsApp click)
- Meta Pixel `Lead` / `Contact`
- TikTok Pixel `SubmitForm` / `Contact`

Alternatif: pakai page view `/terima-kasih` sebagai konversi.

## Catatan teknis

- **Anti-spam**: honeypot tersembunyi, minimal waktu isi 2,5 detik, rate limit per IP, validasi server, URL Apps Script hanya ada di server, dan token rahasia.
- **SEO**: metadata + canonical + hreflang per halaman, `sitemap.xml`, `robots.txt`, OG image otomatis, schema `ProfessionalService`, `Service`, `FAQPage`, `BreadcrumbList`. Halaman `/lp/*` & `/terima-kasih` noindex.
- **Aksesibilitas & performa**: semua animasi menghormati `prefers-reduced-motion`; font self-hosted (tanpa request ke Google Fonts); halaman di-prerender statis.
- **Motif brand**: dua titik amber dari logo dipakai sebagai kursor, eyebrow, bullet, dan animasi hero (titik menyatu saat di-scroll).
