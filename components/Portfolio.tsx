// components/Portfolio.tsx
import fs from "fs";
import path from "path";
import Image from "next/image";

function getImages(): string[] {
  const dir = path.join(process.cwd(), "public/images/portfolio");
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) =>
    /\.(jpg|jpeg|png|webp|JPG|JPEG|PNG|WEBP)$/.test(f)
  );
  // Fisher-Yates shuffle — randomizes order on each server render
  for (let i = files.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [files[i], files[j]] = [files[j], files[i]];
  }
  return files.map((f) => `/images/portfolio/${f}`);
}

const delays = ["", " reveal-delay-1", " reveal-delay-2", " reveal-delay-3", " reveal-delay-4"];

export default function Portfolio() {
  const images = getImages();

  return (
    <section id="portfolio" className="bg-obsidian py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="reveal text-[11px] tracking-mega uppercase text-gold/60">The Work</div>
          <h2 className="reveal reveal-delay-1 mt-4 display text-5xl sm:text-7xl text-warm-white">
            Portfolio
          </h2>
          <div className="reveal reveal-delay-2 mt-6 gold-rule w-20 mx-auto" />
        </div>

        {images.length === 0 ? (
          <p className="text-center text-warm-faint serif-italic text-lg">
            Photos coming soon.
          </p>
        ) : (
          <div className="masonry">
            {images.map((src, i) => (
              <figure
                key={src}
                className={`reveal${delays[i % delays.length]} hover-zoom`}
              >
                <Image
                  src={src}
                  alt={`J Creatives — photo ${i + 1}`}
                  width={800}
                  height={533}
                  className="w-full h-auto"
                />
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
