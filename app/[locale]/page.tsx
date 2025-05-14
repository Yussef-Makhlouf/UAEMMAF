import Hero from "@/components/hero"
import AboutSection from "@/components/about-section"
import NewsSection from "@/components/news-section"
import EventsSection from "@/components/events-section" 
import PartnersSection from "@/components/partners-section"
import JoinUsSection from "@/components/join-us-section"
import ContactSection from "@/components/contact-section"


export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <JoinUsSection />
    
      <NewsSection />
      
      <EventsSection />
      <PartnersSection />
      {/* <ContactSection /> */}
    </>
  )
}
