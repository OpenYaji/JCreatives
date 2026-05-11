// app/page.tsx
export const dynamic = "force-dynamic";

import RevealInit from "@/components/RevealInit";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import About from "@/components/About";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <RevealInit />
      <Nav />
      <Hero />
      <Portfolio />
      <About />
      <BookingForm />
      <Footer />
    </>
  );
}
