import BackgroundScene from "@/components/backgroundscene"
import OrbitSkills from "@/components/orbitskills"
import { WorkExperience } from "@/components/workexperience"
import { HeroContent } from "@/components/hero-section"
import ExperiencePage from "@/components/experiencepage"

export const Home = ({ onLoaded }: { onLoaded: () => void }) => {
  return (
    <>
      <BackgroundScene onLoaded={onLoaded} />

      {/* HERO */}
      <section className="min-h-screen flex items-center justify-center">
        <HeroContent />
      </section>

      {/* WORK EXPERIENCE */}
      <section className="min-h-screen flex items-center justify-center">
        <WorkExperience />
      </section>

      {/* SKILLS */}
      <section className="min-h-screen flex items-center justify-center">
        <OrbitSkills />
      </section>

      {/* Experience & Certifications */}
      <section className="min-h-screen flex items-center justify-center">
        <ExperiencePage />
      </section>
    </>
  )
}