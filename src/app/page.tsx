import { Hero } from "@/components/sections/Hero";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { AboutSnippet } from "@/components/sections/AboutSnippet";
import { TestimonialsStrip } from "@/components/sections/TestimonialsStrip";
import { WarmCTA } from "@/components/sections/WarmCTA";
import { SocialStrip } from "@/components/sections/SocialStrip";
import { JsonLd } from "@/components/seo/JsonLd";
import { reviewsJsonLd } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <JsonLd data={reviewsJsonLd()} />
      <Hero />
      <ServicesPreview />
      <AboutSnippet />
      <TestimonialsStrip />
      <WarmCTA />
      <SocialStrip />
    </>
  );
}
