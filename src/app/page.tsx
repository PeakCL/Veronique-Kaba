import { Hero } from "@/components/sections/Hero";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { AboutSnippet } from "@/components/sections/AboutSnippet";
import { SocialStrip } from "@/components/sections/SocialStrip";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <AboutSnippet />
      <SocialStrip />
    </>
  );
}
