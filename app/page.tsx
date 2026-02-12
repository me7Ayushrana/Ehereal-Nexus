import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Achievements from "@/components/Achievements";
import GalaxyEntry from "@/components/GalaxyEntry";

import WorkStackPromo from "@/components/WorkStackPromo";
import AuthorPromo from "@/components/AuthorPromo";


export default function Home() {
  return (
    <main className="min-h-screen bg-void">

      <Hero />
      <Achievements />
      <GalaxyEntry />
      <Services />
      <WorkStackPromo />
      <div className="h-20"></div> {/* Bottom Spacer */}
      <AuthorPromo />
    </main>
  );
}
