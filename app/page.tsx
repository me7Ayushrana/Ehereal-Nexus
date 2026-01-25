import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Achievements from "@/components/Achievements";
import GalaxyEntry from "@/components/GalaxyEntry";
import Preloader from "@/components/Preloader";


export default function Home() {
  return (
    <main className="min-h-screen bg-void">
      <Preloader />
      <Hero />
      <Achievements />
      <GalaxyEntry />
      <Services />
      <div className="h-20"></div> {/* Bottom Spacer */}
    </main>
  );
}
