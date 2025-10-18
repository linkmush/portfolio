import { DotNavigation } from "@/components/dotnavigation";
import { HeroSection } from "@/components/hero-section";
import OrbitSkills from "@/components/orbitskills";
import { WorkExperience } from "@/components/workexperience";

export const Home = ({ onLoaded }: { onLoaded: () => void }) => {
  return (
    <div className="relative h-screen">
      {/* Dot navigation – fixeras till höger på skärmen */}
      <DotNavigation />

      {/* Scroll container med snapping */}
      <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
        <section id="heroSection" className="h-screen snap-start">
          <HeroSection onLoaded={onLoaded} />
        </section>

        <section id="experienceSection" className="h-screen snap-start">
          <WorkExperience />
        </section>

        <section id="skills" className="h-screen snap-start bg-black text-white">
          <OrbitSkills/>
        </section>

        {/* <section id="contactSection" className="h-screen snap-start bg-purple-950 text-white">
          Contact here...
        </section> */}
      </div>
    </div>
  );
};