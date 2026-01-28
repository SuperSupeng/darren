import {
  Hero,
  NowBuilding,
  FeaturedProjects,
  Signals,
  FooterCta,
} from '@/components/home';

export default function HomePage() {
  return (
    <>
      <Hero />
      <NowBuilding />
      <FeaturedProjects />
      <Signals />
      <FooterCta />
    </>
  );
}
