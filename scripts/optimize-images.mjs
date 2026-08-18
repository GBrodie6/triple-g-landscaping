/**
 * One-time asset prep. Originals from the camera are ~4032px / 5-8MB each,
 * several with EXIF orientation flags. This bakes rotation in, resizes to a
 * sane web maximum, and generates the favicon / OG image from the logo.
 *
 * Originals are copied to public/images/originals (gitignored) first, so the
 * script can be re-run without compounding compression.
 *
 *   node scripts/optimize-images.mjs               all assets
 *   node scripts/optimize-images.mjs --brand-only  logo, icons, and OG only
 *   node scripts/optimize-images.mjs snow-1.jpg    only the files named
 */
import { cp, mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const imagesDir = path.join(root, "public", "images");
const originalsDir = path.join(imagesDir, "originals");
const appDir = path.join(root, "src", "app");

const MAX_EDGE = 2400;

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  // Preserve originals once.
  if (!(await exists(originalsDir))) {
    await mkdir(originalsDir, { recursive: true });
    for (const file of await readdir(imagesDir)) {
      if (file === "originals") continue;
      await cp(path.join(imagesDir, file), path.join(originalsDir, file));
    }
    console.log("Backed up originals ->", path.relative(root, originalsDir));
  }

  // Re-encoding every photo is idempotent but rewrites ~12MB of binaries, so
  // pass --brand-only when just the logo, favicon, and OG image have changed,
  // or name specific files to process only those.
  const brandOnly = process.argv.includes("--brand-only");
  const named = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  // Brand artwork is handled separately below, where the white background
  // is knocked out, so it must not go through the plain photo pipeline.
  const brandFiles = ["favicon-logo.png", "logo-horizontal.png", "logo.png"];
  const sources = (await readdir(originalsDir))
    .filter((f) => /\.(jpe?g|png)$/i.test(f))
    .filter((f) => !brandFiles.includes(f))
    .filter((f) => (named.length ? named.includes(f) : !brandOnly));

  const missing = named.filter(
    (n) => !sources.includes(n) && !brandFiles.includes(n),
  );
  if (missing.length) {
    throw new Error(`not found in originals/: ${missing.join(", ")}`);
  }

  for (const file of sources) {
    const src = path.join(originalsDir, file);
    const out = path.join(imagesDir, file);
    const before = (await stat(src)).size;

    const pipeline = sharp(src)
      .rotate() // apply + strip EXIF orientation
      .resize({
        width: MAX_EDGE,
        height: MAX_EDGE,
        fit: "inside",
        withoutEnlargement: true,
      });

    if (/\.png$/i.test(file)) {
      await pipeline
        .resize({ width: 512, height: 512, fit: "inside" })
        .png({ compressionLevel: 9, palette: true })
        .toFile(out + ".tmp");
    } else {
      await pipeline.jpeg({ quality: 78, mozjpeg: true }).toFile(out + ".tmp");
    }

    await cp(out + ".tmp", out);
    const { unlink } = await import("node:fs/promises");
    await unlink(out + ".tmp");

    const after = (await stat(out)).size;
    const meta = await sharp(out).metadata();
    console.log(
      `${file.padEnd(20)} ${(before / 1e6).toFixed(1)}MB -> ${(after / 1e6).toFixed(2)}MB  (${meta.width}x${meta.height})`,
    );
  }

  // --- Brand marks ---------------------------------------------------------
  // Both source files are black-and-green artwork on flat white. Knocking the
  // white out gives a mark that sits on cream and on near-black without a
  // chip behind it; the light variant recolours the black art for dark
  // surfaces. Chromatic pixels (the green) are left alone.
  async function knockOutWhite(file, artColor, chromaColor) {
    const { data, info } = await sharp(file)
      .flatten({ background: "#ffffff" })
      .trim({ background: "#ffffff", threshold: 12 })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const px = Buffer.from(data);
    for (let i = 0; i < px.length; i += info.channels) {
      const r = px[i];
      const g = px[i + 1];
      const b = px[i + 2];
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);

      if (max - min >= 40) {
        // The green. Recoloured only for the dark-surface variant, where the
        // original forest green has too little contrast to read.
        if (chromaColor) {
          px[i] = chromaColor[0];
          px[i + 1] = chromaColor[1];
          px[i + 2] = chromaColor[2];
        }
      } else {
        // Greyscale: white background, black artwork, and the antialiased
        // steps between them. Alpha follows how dark the pixel was.
        px[i] = artColor[0];
        px[i + 1] = artColor[1];
        px[i + 2] = artColor[2];
        px[i + 3] = 255 - max;
      }
    }

    return sharp(px, { raw: { width: info.width, height: info.height, channels: info.channels } })
      .png({ compressionLevel: 9 })
      .toBuffer();
  }

  const INK = [20, 20, 18];
  const STONE = [242, 239, 230];
  const SAGE = [173, 196, 138];

  const faviconSrc = path.join(originalsDir, "favicon-logo.png");
  const wordmarkSrc = path.join(originalsDir, "logo-horizontal.png");

  const wordmarkDark = await knockOutWhite(wordmarkSrc, INK);
  const wordmarkLight = await knockOutWhite(wordmarkSrc, STONE, SAGE);

  await sharp(wordmarkDark)
    .resize({ width: 900, fit: "inside" })
    .toFile(path.join(imagesDir, "logo-horizontal.png"));
  await sharp(wordmarkLight)
    .resize({ width: 900, fit: "inside" })
    .toFile(path.join(imagesDir, "logo-horizontal-light.png"));

  for (const f of ["logo-horizontal.png", "logo-horizontal-light.png"]) {
    const m = await sharp(path.join(imagesDir, f)).metadata();
    console.log(`\n${f.padEnd(28)} ${m.width}x${m.height} alpha=${m.hasAlpha}`);
  }

  // Icons come from the simplified mark, squared up on white since favicons
  // are composited against unpredictable browser chrome.
  const faviconTrimmed = await sharp(faviconSrc)
    .flatten({ background: "#ffffff" })
    .trim({ background: "#ffffff", threshold: 12 })
    .toBuffer();

  for (const [name, size, pad] of [
    ["icon.png", 512, 56],
    ["apple-icon.png", 180, 22],
  ]) {
    await sharp(faviconTrimmed)
      .resize(size - pad * 2, size - pad * 2, { fit: "contain", background: "#ffffff" })
      .extend({ top: pad, bottom: pad, left: pad, right: pad, background: "#ffffff" })
      .flatten({ background: "#ffffff" })
      .png()
      .toFile(path.join(appDir, name));
  }

  // --- Open Graph image ----------------------------------------------------
  const W = 1200;
  const H = 630;

  const bg = await sharp(path.join(originalsDir, "lawn-1.jpg"))
    .rotate()
    .resize(W, H, { fit: "cover", position: "centre" })
    .toBuffer();

  const overlay = Buffer.from(`
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0f0f0e" stop-opacity="0.50"/>
          <stop offset="55%" stop-color="#0f0f0e" stop-opacity="0.80"/>
          <stop offset="100%" stop-color="#0f0f0e" stop-opacity="0.96"/>
        </linearGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#g)"/>
      <text x="74" y="486" font-family="Arial, Helvetica, sans-serif"
            font-size="31" fill="#ADC48A">
        Lawn care &amp; landscaping · Madison, CT &amp; the shoreline
      </text>
      <text x="74" y="548" font-family="Arial, Helvetica, sans-serif"
            font-size="27" font-weight="bold" fill="#E7E2D4">
        (203) 994-1680  ·  5.0 stars on Google
      </text>
    </svg>
  `);

  // The share card is a dark overlay, so the light wordmark sits on it
  // directly rather than inside a chip.
  const logoChip = await sharp(wordmarkLight)
    .resize({ width: 360, fit: "inside" })
    .png()
    .toBuffer();

  await sharp(bg)
    .composite([
      { input: overlay, top: 0, left: 0 },
      { input: logoChip, top: 250, left: 72 },
    ])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(path.join(appDir, "opengraph-image.jpg"));

  console.log("\nGenerated icon.png, apple-icon.png, opengraph-image.jpg");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
