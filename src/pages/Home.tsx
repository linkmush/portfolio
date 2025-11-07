import { HeroSection } from "@/components/hero-section";
import OrbitSkills from "@/components/orbitskills";
import { WorkExperience } from "@/components/workexperience";

export const Home = ({ onLoaded }: { onLoaded: () => void }) => {
  return (
    <>
      <section id="heroSection" className="h-screen snap-start">
        <HeroSection onLoaded={onLoaded} />
      </section>

      <section id="experienceSection" className="h-screen snap-start">
        <WorkExperience />
      </section>

      <section id="skills" className="h-screen snap-start bg-black text-white">
        <OrbitSkills />
      </section>
    </>
  )
}
