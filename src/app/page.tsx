import Contact from "@/components/Contact";
import Equipment from "@/components/Equipment";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Reviews from "@/components/Reviews";
import Services from "@/components/Services";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Services />
        <Equipment />
        <Gallery />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
