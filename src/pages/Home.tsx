import BackgroundScene from "@/components/backgroundscene"
import OrbitSkills from "@/components/orbitskills"
import { WorkExperience } from "@/components/workexperience"
import { HeroContent } from "@/components/hero-section"

export const Home = ({ onLoaded }: { onLoaded: () => void }) => {
  return (
    <>
      {/* Bakgrunden – måste ha fixed + -z-10 i sin egen komponent */}
      <BackgroundScene onLoaded={onLoaded} />

      {/* HERO */}
      <section className="min-h-screen">
        <HeroContent />
      </section>

      {/* WORK EXPERIENCE */}
      <WorkExperience />

      {/* SKILLS */}
      <section className="min-h-screen">
          <OrbitSkills />
      </section>
    </>
  )
}

