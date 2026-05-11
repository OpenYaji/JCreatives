export const dynamic = "force-dynamic";

import RevealInit from "@/components/RevealInit";
import Nav from "@/components/Nav";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import Portfolio from "@/components/Portfolio";
import About from "@/components/About";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <RevealInit />
      <Nav />
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc="/images/brand.png"
        bgImageSrc="/images/hero.jpg"
        title="J Creatives"
        date="Est. 2020"
        scrollToExpand="Photography · Philippines"
      >
        <Portfolio />
        <About />
        <BookingForm />
        <Footer />
      </ScrollExpandMedia>
    </>
  );
}
