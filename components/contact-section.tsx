"use client"

import { useState, useRef, useEffect } from "react"
import { useTranslations, useLocale } from "next-intl"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { API_URL } from "@/lib/constants";
import ReCAPTCHA from "react-google-recaptcha"

// واجهة أخطاء النموذج
interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

export default function ContactSection() {
  const t = useTranslations('contact')
  const locale = useLocale();
  // استخدام المفتاح التجريبي الرسمي من Google
  const recaptchaSiteKey = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
  
  // Add missing refs and state
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    email: "",
    subject: "",
    message: "",
    phone: "",
  })
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // إعادة تعيين reCAPTCHA عند تغيير اللغة
  useEffect(() => {
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
      setIsCaptchaVerified(false);
      setCaptchaToken(null);
    }
  }, [locale]);

  // إضافة التحقق الأولي من النموذج عند تحميل المكون
  // إضافة تعليق لإزالة التحقق الأولي من النموذج

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  // UAE Phone number validation
  const validateUAEPhone = (phone: string) => {
    // UAE phone numbers can start with +971 or 971 followed by 9 digits
    // Also allow just the phone number without country code for flexibility
    const cleanedPhone = phone.replace(/\s+/g, '').replace(/-/g, '');
    const uaePhoneRegex = /^(?:\+971|971)?[0-9]{9}$/;
    return uaePhoneRegex.test(cleanedPhone);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({
      name: "",
      email: "",
      subject: "",
      message: "",
      phone: "",
    });

    // Validate form
    let hasErrors = false;
    const newErrors: FormErrors = {
      name: "",
      email: "",
      subject: "",
      message: "",
      phone: "",
    };

    if (!formState.name.trim()) {
      newErrors.name = t('form.errors.nameRequired');
      hasErrors = true;
    } else if (formState.name.trim().length < 3) {
      newErrors.name = t('form.errors.nameLength');
      hasErrors = true;
    }

    if (!formState.email.trim()) {
      newErrors.email = t('form.errors.emailRequired');
      hasErrors = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = t('form.errors.emailInvalid');
      hasErrors = true;
    }

    if (!formState.phone.trim()) {
      newErrors.phone = t('form.errors.phoneRequired');
      hasErrors = true;
    } else if (!validateUAEPhone(formState.phone)) {
      newErrors.phone = t('form.errors.phoneInvalid');
      hasErrors = true;
    }

    if (!formState.subject.trim()) {
      newErrors.subject = t('form.errors.subjectRequired');
      hasErrors = true;
    } else if (formState.subject.trim().length < 3) {
      newErrors.subject = t('form.errors.subjectLength');
      hasErrors = true;
    }

    if (!formState.message.trim()) {
      newErrors.message = t('form.errors.messageRequired');
      hasErrors = true;
    } else if (formState.message.trim().length < 10) {
      newErrors.message = t('form.errors.messageLength');
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true)
    
    try {
      // إضافة رمز reCAPTCHA إلى الطلب للتحقق من جانب الخادم
      const response = await fetch(`https://mmaf.onrender.com/contact/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formState,
          recaptchaToken: captchaToken // إرسال الرمز إلى الخادم للتحقق
        }),
      });
      
      if (response.ok) {
        // تمت العملية بنجاح
        console.log("Form submitted successfully");
        setFormState({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        setSubmissionSuccess(true);
      } else {
        // فشل الإرسال
        const errorData = await response.json().catch(() => ({}));
        
        // التحقق مما إذا كان الخطأ متعلق بالتحقق من reCAPTCHA
        if (errorData.error === 'invalid-recaptcha') {
          setCaptchaError(true);
          recaptchaRef.current?.reset();
          setIsCaptchaVerified(false);
          setCaptchaToken(null);
        }
        
        console.error("Form submission failed:", errorData);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // تحديث حالة اللمس للحقل وإعادة التحقق مباشرة
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    
    // إعادة التحقق من الحقل بعد تغييره فورًا
    validateField(name, value);
  }
  
  // التحقق من حقل معين وتحديث الأخطاء
  const validateField = (name: string, value: string) => {
    // نسخ حالة الأخطاء الحالية
    const newErrors = { ...errors };
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          newErrors.name = t('form.errors.nameRequired');
        } else if (value.trim().length < 3) {
          newErrors.name = t('form.errors.nameLength');
        } else {
          newErrors.name = undefined;
        }
        break;
        
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          newErrors.email = t('form.errors.emailRequired');
        } else if (!emailRegex.test(value)) {
          newErrors.email = t('form.errors.emailInvalid');
        } else {
          newErrors.email = undefined;
        }
        break;
        
      case 'phone':
        if (!value.trim()) {
          newErrors.phone = t('form.errors.phoneRequired');
        } else if (!validateUAEPhone(value)) {
          newErrors.phone = t('form.errors.phoneInvalid');
        } else {
          newErrors.phone = undefined;
        }
        break;
        
      case 'subject':
        if (!value.trim()) {
          newErrors.subject = t('form.errors.subjectRequired');
        } else if (value.trim().length < 3) {
          newErrors.subject = t('form.errors.subjectLength');
        } else {
          newErrors.subject = undefined;
        }
        break;
        
      case 'message':
        if (!value.trim()) {
          newErrors.message = t('form.errors.messageRequired');
        } else if (value.trim().length < 10) {
          newErrors.message = t('form.errors.messageLength');
        } else {
          newErrors.message = undefined;
        }
        break;
    }
    
    // تحديث حالة الأخطاء
    setErrors(newErrors);
  }
  
  // التعامل مع تركيز الحقل
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    validateField(name, value);
  }

  const handleSendAnother = () => {
    setSubmissionSuccess(false);
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
      setIsCaptchaVerified(false);
      setCaptchaToken(null);
    }
  }

  return (
    <section className="py-20 bg-background" id="contact">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Contact Information */}
          <motion.div variants={itemVariants} className="flex flex-col space-y-8">
            <div>
              <h2 className="text-primary text-lg font-medium">{t('getInTouch')}</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-6">
                {t('title')}
              </h3>
              <p className="text-gray-300 max-w-md">
                {t('description')}
              </p>
            </div>
            
            <div className="bg-background-300 p-6 rounded-lg space-y-6">
              <div className="flex items-start">
                <div className="bg-primary/20 p-3 rounded-full mr-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-white font-medium">{t('email')}</h4>
                  <a href="mailto: info@uaemmaf.com" className="text-gray-300 hover:text-primary transition-colors">
                     info@uaemmaf.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/20 p-3 rounded-full mr-4">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-white font-medium">{t('phone')}</h4>
                  <a href="tel:+97123336111" className="text-gray-300 hover:text-primary transition-colors">
                    97123336111
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/20 p-3 rounded-full mr-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-white font-medium">{t('address')}</h4>
                  <p className="text-gray-300">
                  UAE Mixed Martial Art Federation
Capital Tower, Abu Dhabi, UAE
PO Box 110007 Abu Dhabi, UAE
                  </p>
                </div>
              </div>
            </div>
            
            {/* <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-background-300 p-3 rounded-full text-white hover:text-primary hover:bg-background-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-background-300 p-3 rounded-full text-white hover:text-primary hover:bg-background-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="bg-background-300 p-3 rounded-full text-white hover:text-primary hover:bg-background-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
            </div> */}
          </motion.div>
          
          {/* Contact Form or Success Message */}
          <motion.div variants={itemVariants}>
            {submissionSuccess ? (
              <div className="bg-background-300 p-8 rounded-lg text-center">
                <div className="mb-6 inline-flex p-4 rounded-full bg-green-100">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
          
                <h3 className="text-2xl font-bold text-white mb-4">
                  {t('form.thankYouTitle') || "Thank You!"}
                </h3>
                <p className="text-gray-300 mb-8">
                  {t('form.thankYouMessage') || "Your message has been received. We will get back to you as soon as possible."}
                </p>
                <Button 
                  onClick={handleSendAnother}
                  className="bg-primary hover:bg-primary-dark text-white"
                >
                  {t('form.sendAnother') || "Send Another Message"}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-background-300 p-8 rounded-lg">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-white mb-2">
                      {t('form.name')}
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      className={`bg-background border-gray-700 text-white focus:border-primary ${errors.name ? 'border-red-500' : ''}`}
                      placeholder={t('form.namePlaceholder')}
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-white mb-2">
                      {t('form.email')}
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      className={`bg-background border-gray-700 text-white focus:border-primary ${errors.email ? 'border-red-500' : ''}`}
                      placeholder={t('form.emailPlaceholder')}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-white mb-2">
                      {t('form.phone')}
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formState.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      className={`bg-background border-gray-700 text-white focus:border-primary ${errors.phone ? 'border-red-500' : ''}`}
                      placeholder={t('form.phonePlaceholder')}
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-white mb-2">
                      {t('form.subject')}
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      className={`bg-background border-gray-700 text-white focus:border-primary ${errors.subject ? 'border-red-500' : ''}`}
                      placeholder={t('form.subjectPlaceholder')}
                    />
                    {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-white mb-2">
                      {t('form.message')}
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      className={`bg-background border-gray-700 text-white focus:border-primary min-h-32 ${errors.message ? 'border-red-500' : ''}`}
                      placeholder={t('form.messagePlaceholder')}
                    />
                    {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                  </div>
                  
                  {/* Add ReCAPTCHA component */}
                  <div className="mt-4">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={recaptchaSiteKey}
                      onChange={(token) => {
                        setCaptchaToken(token);
                        setIsCaptchaVerified(!!token);
                        setCaptchaError(false);
                      }}
                    />
                    {captchaError && (
                      <p className="mt-1 text-sm text-red-500">{t('form.errors.captchaRequired')}</p>
                    )}
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary-dark text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t('form.sending')}
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Send className="mr-2 h-4 w-4" />
                        {t('form.submit')}
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
        
        {/* Google Maps */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            {t('location')}
          </h3>
          <div className="rounded-lg overflow-hidden shadow-lg h-[400px] w-full">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d68949.90053632692!2d54.442805!3d24.418652!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e42167a9cd0f1%3A0x7986ec2b7a18e80f!2sUAE%20Jiu-Jitsu%20Federation!5e1!3m2!1sar!2sus!4v1747085469086!5m2!1sar!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="UAE Mixed Martial Arts Federation Location"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
