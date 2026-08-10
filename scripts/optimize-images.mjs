/**
 * One-time asset prep. Originals from the camera are ~4032px / 5-8MB each,
 * several with EXIF orientation flags. This bakes rotation in, resizes to a
 * sane web maximum, and generates the favicon / OG image from the logo.
 *
 * Originals are copied to public/images/originals (gitignored) first, so the
 * script can be re-run without compounding compression.
 *
 *   node scripts/optimize-images.mjs
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

  const sources = (await readdir(originalsDir)).filter((f) =>
    /\.(jpe?g|png)$/i.test(f),
  );

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

  // --- Favicon / app icons -------------------------------------------------
  const logo = path.join(originalsDir, "logo.png");
  const logoMeta = await sharp(logo).metadata();
  console.log("\nlogo alpha channel:", logoMeta.hasAlpha, "channels:", logoMeta.channels);

  await sharp(logo)
    .resize(512, 512, { fit: "contain", background: "#ffffff" })
    .flatten({ background: "#ffffff" })
    .png()
    .toFile(path.join(appDir, "icon.png"));

  await sharp(logo)
    .resize(160, 160, { fit: "contain", background: "#ffffff" })
    .extend({
      top: 10,
      bottom: 10,
      left: 10,
      right: 10,
      background: "#ffffff",
    })
    .flatten({ background: "#ffffff" })
    .png()
    .toFile(path.join(appDir, "apple-icon.png"));

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
          <stop offset="0%" stop-color="#131a0d" stop-opacity="0.55"/>
          <stop offset="55%" stop-color="#131a0d" stop-opacity="0.78"/>
          <stop offset="100%" stop-color="#131a0d" stop-opacity="0.95"/>
        </linearGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#g)"/>
      <text x="72" y="392" font-family="Arial Black, Arial, Helvetica, sans-serif"
            font-size="76" font-weight="900" letter-spacing="-3" fill="#F2EFE6">
        TRIPLE G LANDSCAPING
      </text>
      <text x="74" y="450" font-family="Arial, Helvetica, sans-serif"
            font-size="31" fill="#ADC48A">
        Lawn care &amp; landscaping · Madison, CT &amp; the shoreline
      </text>
      <text x="74" y="524" font-family="Arial, Helvetica, sans-serif"
            font-size="27" font-weight="bold" fill="#E7E2D4">
        (203) 994-1680  ·  5.0 stars from 7 Google reviews
      </text>
    </svg>
  `);

  const logoChip = await sharp({
    create: {
      width: 168,
      height: 168,
      channels: 4,
      background: "#F2EFE6",
    },
  })
    .composite([
      {
        input: await sharp(logo)
          .resize(140, 140, { fit: "contain", background: "#F2EFE6" })
          .flatten({ background: "#F2EFE6" })
          .toBuffer(),
        gravity: "centre",
      },
    ])
    .png()
    .toBuffer();

  await sharp(bg)
    .composite([
      { input: overlay, top: 0, left: 0 },
      { input: logoChip, top: 88, left: 72 },
    ])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(path.join(appDir, "opengraph-image.jpg"));

  console.log("\nGenerated icon.png, apple-icon.png, opengraph-image.jpg");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
