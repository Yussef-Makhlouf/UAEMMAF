"use client"

import { useTranslations, useLocale } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { 
  CalendarDays, 
  MapPin, 
  Clock, 
  Users, 
  ChevronLeft,
  Share2,
  Heart
} from "lucide-react"

type EventItem = {
  id: number
  title: string
  description: string
  date: string
  time: string
  location: string
  participants: string
  image: string
  slug: string
  category: string
  longDescription?: string
}

export default function EventDetailPage() {
  const t = useTranslations('events')
  const locale = useLocale()
  const params = useParams()
  const slug = params?.slug as string
  
  // Mock events data - in a real application, this would come from an API or CMS
  const allEvents: EventItem[] = [
    {
      id: 1,
      title: t('event1.title'),
      description: t('event1.description'),
      longDescription: "The UAE MMA Championship 2025 is the premier mixed martial arts event in the UAE, showcasing the country's top athletes across all weight divisions. This prestigious tournament will feature intense battles as fighters compete for national titles and recognition.\n\nThe championship will be held at the iconic Etihad Arena in Abu Dhabi, providing a world-class venue for both competitors and spectators. With over a decade of tradition, this championship continues to grow in scale and prestige each year, attracting media coverage and fans from across the region.\n\nBeyond the competition itself, the event will include meet-and-greet sessions with famous MMA fighters, technical workshops, and exhibition matches showcasing emerging talent in the UAE's MMA scene.",
      date: "2025-06-20",
      time: "18:00",
      location: "Etihad Arena, Abu Dhabi",
      participants: "250+",
      image: "/hero1.jpeg",
      slug: "uae-mma-championship-2025",
      category: "championships"
    },
    {
      id: 2,
      title: t('event2.title'),
      description: t('event2.description'),
      longDescription: "The IMMAF World Championship Qualifiers 2025 is a critical tournament for UAE fighters aiming to represent their nation on the global stage. As an official qualifying event for the prestigious IMMAF World Championships, this competition will determine which athletes earn spots on the national team.\n\nHeld at the Dubai World Trade Centre, this event brings together the elite fighters from across the UAE in a display of technical excellence and competitive spirit. Participants will compete across various weight classes in accordance with IMMAF regulations.\n\nThe tournament serves as a strategic platform for talent identification and development within the UAE's MMA ecosystem. Coaches, officials, and talent scouts will be in attendance to evaluate performances and potential for international representation.",
      date: "2025-07-15",
      time: "16:00",
      location: "Dubai World Trade Centre",
      participants: "180+",
      image: "/hero2.jpeg",
      slug: "immaf-world-championship-qualifiers-2025",
      category: "qualifiers"
    },
    {
      id: 3,
      title: "UAEMMAF Youth Tournament 2025",
      description: "A special tournament showcasing the next generation of MMA talent, focused on youth development and providing a stepping stone to professional competition.",
      longDescription: "The UAEMMAF Youth Tournament 2025 represents the federation's commitment to developing the next generation of MMA talent in the UAE. This specialized competition provides young fighters with a safe, structured environment to gain valuable competitive experience and showcase their skills.\n\nHeld at the Mubadala Arena in Abu Dhabi, the tournament features modified rules appropriate for youth competitors while maintaining the core elements of mixed martial arts. Age categories range from 12-14 and 15-17, with strict safety protocols in place.\n\nBeyond competition, the event incorporates educational components on sportsmanship, discipline, and technical development. Parents, coaches, and youth development specialists will participate in workshops running alongside the tournament to discuss best practices in youth MMA training.",
      date: "2025-08-05",
      time: "14:00",
      location: "Mubadala Arena, Abu Dhabi",
      participants: "120+",
      image: "/hero1.jpeg",
      slug: "uaemmaf-youth-tournament-2025",
      category: "youth"
    },
    {
      id: 4,
      title: "UAE Fight Night Series",
      description: "An exciting night of professional MMA fights featuring both established fighters and rising stars from across the UAE and international guests.",
      longDescription: "The UAE Fight Night Series brings the excitement of professional MMA to Dubai's iconic Coca-Cola Arena. This evening showcase features a carefully curated card of matches, balancing established fighters with promising rising stars from the UAE and international guests.\n\nThe event format includes preliminary bouts, main card fights, and a headline championship match. With professional production values, state-of-the-art lighting, and immersive audio, the Fight Night creates an unforgettable atmosphere for both in-person and broadcast audiences.\n\nBeyond the sporting aspect, the UAE Fight Night Series incorporates entertainment elements including musical performances, interactive fan experiences, and ceremonial presentations that celebrate Emirati culture and heritage alongside modern combat sports.",
      date: "2025-08-25",
      time: "19:00",
      location: "Coca-Cola Arena, Dubai",
      participants: "32+",
      image: "/hero2.jpeg",
      slug: "uae-fight-night-series-2025",
      category: "professional"
    },
    {
      id: 5,
      title: "Women's MMA Championship 2025",
      description: "The premier women's MMA event in the UAE showcasing the incredible talent and growth of women's mixed martial arts in the region.",
      longDescription: "The Women's MMA Championship 2025 represents a milestone in the development of women's combat sports in the UAE and wider Middle East region. This championship showcases the remarkable growth, talent, and technical excellence in female mixed martial arts.\n\nHosted at the prestigious Etihad Arena in Abu Dhabi, the championship features competitions across all standard weight divisions, from strawweight to featherweight. Athletes from across the UAE, neighboring countries, and international guests will compete in this landmark event.\n\nThe championship also serves as a platform for discussion on women in combat sports, with panel discussions, networking opportunities, and special recognitions for pioneers who have helped advance women's participation in MMA throughout the region. Media coverage will highlight personal stories and achievements of the competitors.",
      date: "2025-09-10",
      time: "17:00",
      location: "Etihad Arena, Abu Dhabi",
      participants: "64+",
      image: "/hero1.jpeg",
      slug: "womens-mma-championship-2025",
      category: "championships"
    },
    {
      id: 6,
      title: "UAEMMAF Referee and Judges Seminar",
      description: "A professional development event for referees and judges to ensure the highest standards of officiating in MMA competitions across the UAE.",
      longDescription: "The UAEMMAF Referee and Judges Seminar is a critical professional development event aimed at maintaining and elevating the standards of officiating in mixed martial arts competitions throughout the UAE. This comprehensive training program brings together both experienced officials and newcomers to the field.\n\nHeld at the Abu Dhabi National Exhibition Centre, the seminar combines theoretical instruction with practical exercises. Participants will receive training on the latest rule interpretations, scoring criteria, safety protocols, and ethical considerations in MMA officiating.\n\nLed by internationally certified officials and IMMAF representatives, the seminar includes certification assessments that qualify successful participants to officiate at various levels of competition within the UAE. This initiative ensures consistency, fairness, and safety across all UAEMMAF sanctioned events.",
      date: "2025-09-25",
      time: "09:00",
      location: "Abu Dhabi National Exhibition Centre",
      participants: "50+",
      image: "/hero2.jpeg",
      slug: "referee-judges-seminar-2025",
      category: "seminar"
    }
  ]

  // Find the event based on the slug
  const event = allEvents.find(e => e.slug === slug)

  // Format date to display in the current locale format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }

  // Check if event is in the past
  const isPastEvent = (dateString: string) => {
    const eventDate = new Date(dateString)
    const today = new Date()
    return eventDate < today
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-background-100 flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-3xl font-bold text-white mb-4">{t('eventNotFound.title')}</h1>
          <p className="text-gray-400 mb-6">{t('eventNotFound.description')}</p>
          <Link href="/events">
            <Button className="bg-primary hover:bg-primary-dark text-white">
              {t('eventNotFound.returnToEvents')}
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background-100">
      {/* Hero Banner */}
      <div className="relative h-[400px] md:h-[500px] bg-background-300 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src={event.image}
            alt={event.title} 
            fill 
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-background to-transparent h-24"></div>
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-background to-transparent h-24"></div>
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="inline-block bg-primary px-4 py-1 rounded-full text-sm font-medium text-white mb-4">
            {isPastEvent(event.date) ? t('past') : t('upcoming')}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {event.title}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <div className="w-full md:w-2/3">
            <Link href="/events" className="inline-flex items-center text-primary hover:underline mb-6">
              <ChevronLeft className="h-4 w-4 mr-1" />
              {t('viewAll')}
            </Link>
            
            <div className="bg-background-200 rounded-lg overflow-hidden border border-gray-800 mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-700">
                <div className="p-6 text-center">
                  <CalendarDays className="h-6 w-6 mx-auto mb-3 text-primary" />
                  <h4 className="text-white font-medium mb-1">{t('detailLabels.date')}</h4>
                  <p className="text-gray-400">{formatDate(event.date)}</p>
                </div>
                <div className="p-6 text-center">
                  <Clock className="h-6 w-6 mx-auto mb-3 text-primary" />
                  <h4 className="text-white font-medium mb-1">{t('detailLabels.time')}</h4>
                  <p className="text-gray-400">{event.time}</p>
                </div>
                <div className="p-6 text-center">
                  <MapPin className="h-6 w-6 mx-auto mb-3 text-primary" />
                  <h4 className="text-white font-medium mb-1">{t('detailLabels.location')}</h4>
                  <p className="text-gray-400">{event.location}</p>
                </div>
                <div className="p-6 text-center">
                  <Users className="h-6 w-6 mx-auto mb-3 text-primary" />
                  <h4 className="text-white font-medium mb-1">{t('detailLabels.participants')}</h4>
                  <p className="text-gray-400">{event.participants} {t('competitors')}</p>
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-4">{t('detailLabels.aboutEvent')}</h2>
            <div className="text-gray-300 space-y-4 mb-8">
              {event.longDescription?.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-4 mb-8">
              {!isPastEvent(event.date) && (
                <Button className="bg-primary hover:bg-primary-dark text-white">
                  {t('register')}
                </Button>
              )}
              <Button variant="outline" className="text-white border-white hover:bg-background-400">
                <Share2 className="mr-2 h-4 w-4" />
                {t('detailLabels.shareEvent')}
              </Button>
              <Button variant="outline" className="text-white border-white hover:bg-background-400">
                <Heart className="mr-2 h-4 w-4" />
                {t('detailLabels.saveEvent')}
              </Button>
            </div>
            
            {/* Registration Form Section */}
            {!isPastEvent(event.date) && (
              <div id="register" className="bg-background-200 rounded-lg border border-gray-800 p-8 mb-8">
                <h2 className="text-2xl font-bold text-white mb-6">{t('registerForm.title')}</h2>
                <p className="text-gray-300 mb-6">{t('registerForm.description')}</p>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white mb-2">{t('registerForm.firstName')}</label>
                      <input 
                        type="text" 
                        className="w-full bg-background-300 border border-gray-700 rounded-md p-3 text-white"
                        placeholder={t('registerForm.firstNamePlaceholder')}
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-2">{t('registerForm.lastName')}</label>
                      <input 
                        type="text" 
                        className="w-full bg-background-300 border border-gray-700 rounded-md p-3 text-white"
                        placeholder={t('registerForm.lastNamePlaceholder')}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-white mb-2">{t('registerForm.email')}</label>
                    <input 
                      type="email" 
                      className="w-full bg-background-300 border border-gray-700 rounded-md p-3 text-white"
                      placeholder={t('registerForm.emailPlaceholder')}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white mb-2">{t('registerForm.phone')}</label>
                    <input 
                      type="tel" 
                      className="w-full bg-background-300 border border-gray-700 rounded-md p-3 text-white"
                      placeholder={t('registerForm.phonePlaceholder')}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white mb-2">{t('registerForm.participantType')}</label>
                    <select className="w-full bg-background-300 border border-gray-700 rounded-md p-3 text-white">
                      <option>{t('registerForm.selectType')}</option>
                      <option>{t('registerForm.typeCompetitor')}</option>
                      <option>{t('registerForm.typeCoach')}</option>
                      <option>{t('registerForm.typeOfficial')}</option>
                      <option>{t('registerForm.typeSpectator')}</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-white mb-2">{t('registerForm.notes')}</label>
                    <textarea 
                      className="w-full bg-background-300 border border-gray-700 rounded-md p-3 text-white h-32"
                      placeholder={t('registerForm.notesPlaceholder')}
                    ></textarea>
                  </div>
                  
                  <div className="pt-4">
                    <Button className="w-full bg-primary hover:bg-primary-dark text-white py-6">
                      {t('registerForm.submit')}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="w-full md:w-1/3">
            <div className="bg-background-200 rounded-lg border border-gray-800 p-6 mb-6">
              <h3 className="text-xl font-bold text-white mb-4">{t('detailLabels.eventOrganizer')}</h3>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mr-4">
                  <span className="text-white font-bold">UAE</span>
                </div>
                <div>
                  <h4 className="text-white font-medium">{t('detailLabels.organizerName')}</h4>
                  <p className="text-gray-400 text-sm">{t('detailLabels.organizerRole')}</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                {t('detailLabels.organizerDescription')}
              </p>
              <Link href="/contact">
                <Button variant="outline" className="w-full text-white border-white hover:bg-background-400">
                  {t('detailLabels.contactOrganizer')}
                </Button>
              </Link>
            </div>
            
            <div className="bg-background-200 rounded-lg border border-gray-800 p-6 mb-6">
              <h3 className="text-xl font-bold text-white mb-4">{t('detailLabels.venueInfo')}</h3>
              <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden">
                <Image
                  src="/hero2.jpeg"
                  alt={event.location}
                  fill
                  loading="lazy"
                  className="object-cover"
                />
              </div>
              <h4 className="text-white font-medium mb-2">{event.location}</h4>
              <p className="text-gray-300 mb-4">
                {t('detailLabels.venueDescription')}
              </p>
              <Button variant="outline" className="w-full text-white border-white hover:bg-background-400">
                {t('detailLabels.viewOnMap')}
              </Button>
            </div>
            
            <div className="bg-background-200 rounded-lg border border-gray-800 p-6">
              <h3 className="text-xl font-bold text-white mb-4">{t('detailLabels.otherEvents')}</h3>
              <div className="space-y-4">
                {allEvents.filter(e => e.id !== event.id).slice(0, 3).map((otherEvent) => (
                  <Link href={`/events/${otherEvent.slug}`} key={otherEvent.id}>
                    <div className="flex items-start group">
                      <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden mr-3">
                        <Image
                          src={otherEvent.image}
                          alt={otherEvent.title}
                          fill
                          loading="lazy"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-white font-medium group-hover:text-primary transition-colors">
                          {otherEvent.title}
                        </h4>
                        <p className="text-gray-400 text-sm">
                          {formatDate(otherEvent.date)}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 