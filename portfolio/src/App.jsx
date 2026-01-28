import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SectionDivider from './components/SectionDivider';

function BackgroundEffects() {
  return (
    <>
      <div className="aurora" aria-hidden="true" />
      <div className="grain-overlay" aria-hidden="true" />
    </>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-x-hidden">
      <BackgroundEffects />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
