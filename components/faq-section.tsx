"use client"

import { useState } from "react"
import { useTranslations } from 'next-intl';

export default function FaqSection() {
  const t = useTranslations('faqSection');
  const [openItem, setOpenItem] = useState(0)

  const faqItems = [
    {
      question: t('faqItems.0.question'),
      answer: t('faqItems.0.answer')
    },
    {
      question: t('faqItems.1.question'),
      answer: t('faqItems.1.answer')
    },
    {
      question: t('faqItems.2.question'),
      answer: t('faqItems.2.answer')
    },
    {
      question: t('faqItems.3.question'),
      answer: t('faqItems.3.answer')
    },
    {
      question: t('faqItems.4.question'),
      answer: t('faqItems.4.answer')
    },
    {
      question: t('faqItems.5.question'),
      answer: t('faqItems.5.answer')
    },
    {
      question: t('faqItems.6.question'),
      answer: t('faqItems.6.answer')
    },
    {
      question: t('faqItems.7.question'),
      answer: t('faqItems.7.answer')
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 lg:px-[100px]">
        <div className="flex flex-col items-center gap-12 max-w-[813px] mx-auto">
          <div className="flex items-center gap-5">
            <div className="bg-gray-100 rounded-[40px] py-[10px] px-4 flex items-center">
              <span className="text-black font-bold text-xs sm:text-sm"> {t('faq')}</span>
            </div>
          </div>

          <h2 className="text-black text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight sm:leading-[33px] text-center">
            {t('heading')}
          </h2>

          <p className="text-gray-600 text-base sm:text-lg font-medium leading-8 sm:leading-10"> {t('q&s')} </p>
        </div>

        <div className="flex flex-col gap-3 mt-16 max-w-[1720px] mx-auto">
          {faqItems.map((item, index) => (
            <div 
              key={index} 
              className="bg-gray-50 rounded-[40px] p-5 cursor-pointer transition-all duration-300 hover:shadow-md border border-gray-100"
              onClick={() => setOpenItem(openItem === index ? -1 : index)}
            >
              <div className="flex justify-between items-center">
                <div className={`w-5 h-5 ${openItem === index ? 'bg-[#E31E24]' : 'bg-black'} rounded-full flex items-center justify-center transition-colors duration-300`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {openItem === index ? (
                      <path d="M19 13H5V11H19V13Z" fill="white" />
                    ) : (
                      <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="white" />
                    )}
                  </svg>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <h3 className={`${openItem === index ? 'text-[#E31E24] text-xl sm:text-2xl font-extrabold' : 'text-black text-sm sm:text-base font-semibold'} transition-all duration-300`}>
                    {item.question}
                  </h3>
                  {openItem === index && (
                    <p className="text-gray-700 text-sm sm:text-base font-semibold animate-fadeIn text-center">
                      {item.answer}
                    </p>
                  )}
                </div>
                <div className={`w-8 h-8 bg-[#E31E24] rounded-full flex items-center justify-center transform transition-transform duration-300 ${openItem === index ? 'rotate-180' : 'rotate-90'}`}>
                  <svg width="7" height="4" viewBox="0 0 7 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M1 1L1 1L3.5 3L6 1"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
