import {
  Hero,
  NowBuilding,
  BuildDirection,
  Signals,
  Portals,
  FooterCta,
} from '@/components/home';

export default function HomePage() {
  return (
    <>
      <Hero />
      <NowBuilding />
      <BuildDirection />
      <Signals />
      <Portals />
      <FooterCta />
    </>
  );
}
