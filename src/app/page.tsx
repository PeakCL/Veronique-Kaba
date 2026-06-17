import { Hero } from "@/components/sections/Hero";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { AboutSnippet } from "@/components/sections/AboutSnippet";
import { TestimonialsStrip } from "@/components/sections/TestimonialsStrip";
import { WarmCTA } from "@/components/sections/WarmCTA";
import { SocialStrip } from "@/components/sections/SocialStrip";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <AboutSnippet />
      <TestimonialsStrip />
      <WarmCTA />
      <SocialStrip />
    </>
  );
}
