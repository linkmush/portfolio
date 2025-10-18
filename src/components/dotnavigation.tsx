import { useEffect, useState } from "react";

const sections = ["heroSection", "experienceSection", "skills", "contactSection"];

export const DotNavigation = () => {
  const [active, setActive] = useState<string>("heroSection");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.6 } // 60% synlig krävs för att trigga
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
      {sections.map((id) => (
        <a
          key={id}
          href={`#${id}`}
          className={`w-3 h-3 rounded-full transition-all ${
            active === id ? "bg-purple-500 scale-125" : "bg-gray-500"
          }`}
        />
      ))}
    </div>
  );
};
