import BackgroundScene from "@/components/backgroundscene";
import { SectionCard } from "@/components/sectioncard";
import OrbitSkills from "@/components/orbitskills";
import { WorkExperience } from "@/components/workexperience";
import { HeroContent } from "@/components/hero-section";

export const Home = ({ onLoaded }: { onLoaded: () => void }) => {
  return (
    <>
      <BackgroundScene onLoaded={onLoaded} />

      <section id="heroSection" className="relative w-full h-screen snap-start pointer-events-auto">
        <HeroContent />
      </section>

      {/* cards */}
      <main className="relative z-10 snap-y snap-mandatory pointer-events-auto">
        <SectionCard id="experienceSection" className="snap-start" widthClass="max-w-[1100px]">
          <WorkExperience />
        </SectionCard>

        <SectionCard id="skills" widthClass="max-w-[1100px]">
          <OrbitSkills />
        </SectionCard>
      </main>
    </>
  );
};
