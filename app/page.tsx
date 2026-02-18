import { Header } from '@/components/header'
import { TopBanner } from '@/components/top-banner'
import { HeroSection } from '@/components/hero-section'
import { CatalogSection } from '@/components/catalog-section'
import { RepairSection } from '@/components/repair-section'
import { AdvantagesSection } from '@/components/advantages-section'
import { ContactsSection } from '@/components/contacts-section'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <TopBanner />
      <main>
        <HeroSection />
        <CatalogSection />
        <RepairSection />
        <AdvantagesSection />
        <ContactsSection />
      </main>
    </div>
  )
}
