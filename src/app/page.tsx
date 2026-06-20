import LenisProvider from "@/components/LenisProvider";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Memories from "@/components/Memories";
import Collective from "@/components/Collective";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <LenisProvider>
      <Header />
      <main>
        <Hero />
        <About />
        <Memories />
        <Collective />
        <Footer />
      </main>
    </LenisProvider>
  );
}
