import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';

export function Contact() {
  const language = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const content = {
    en: {
      title: 'Get in',
      titleAccent: 'Touch',
      subtitle: "Have a project in mind? Let's collaborate and build something extraordinary together.",
      sendMessageHeading: 'Send us a Message',
      yourName: 'Your Name',
      emailAddress: 'Email Address',
      subject: 'Subject',
      message: 'Message',
      placeholderName: 'John Doe',
      placeholderEmail: 'john@example.com',
      placeholderSubject: 'Project Inquiry',
      placeholderMessage: 'Tell us about your project...',
      sendMessage: 'Send Message',
      contactInformation: 'Contact Information',
      phone: 'Phone',
      location: 'Location',
      officeHours: 'Office Hours',
      mondayFriday: 'Monday - Friday',
      saturday: 'Saturday',
      sunday: 'Sunday',
      closed: 'Closed',
      readyToStart: 'Ready to Start?',
      ctaText: "Let's discuss your project and turn your vision into reality.",
      responseTime: 'Response time: Within 24 hours',
    },
    sq: {
      title: 'Na',
      titleAccent: 'Kontaktoni',
      subtitle: 'Keni nje projekt ne mendje? Le te bashkepunojme dhe te ndertojme dicka te jashtezakonshme se bashku.',
      sendMessageHeading: 'Na dergoni nje mesazh',
      yourName: 'Emri juaj',
      emailAddress: 'Adresa e email-it',
      subject: 'Subjekti',
      message: 'Mesazhi',
      placeholderName: 'Emri Mbiemri',
      placeholderEmail: 'email@shembull.com',
      placeholderSubject: 'Kerkese per projekt',
      placeholderMessage: 'Na tregoni per projektin tuaj...',
      sendMessage: 'Dergo mesazhin',
      contactInformation: 'Informacion kontakti',
      phone: 'Telefoni',
      location: 'Vendndodhja',
      officeHours: 'Orari i punes',
      mondayFriday: 'E hene - E premte',
      saturday: 'E shtune',
      sunday: 'E diel',
      closed: 'Mbyllur',
      readyToStart: 'Gati per te filluar?',
      ctaText: 'Le te diskutojme projektin tuaj dhe ta kthejme vizionin ne realitet.',
      responseTime: 'Koha e pergjigjes: Brenda 24 oreve',
    },
  } as const;

  const t = content[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            {t.title} <span className="text-[#D27D59]">{t.titleAccent}</span>
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            className="glass-container p-8 rounded-3xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-6">{t.sendMessageHeading}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  {t.yourName}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#D27D59] focus:outline-none transition-colors"
                  placeholder={t.placeholderName}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  {t.emailAddress}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#D27D59] focus:outline-none transition-colors"
                  placeholder={t.placeholderEmail}
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  {t.subject}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#D27D59] focus:outline-none transition-colors"
                  placeholder={t.placeholderSubject}
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  {t.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#D27D59] focus:outline-none transition-colors resize-none"
                  placeholder={t.placeholderMessage}
                  required
                />
              </div>

              <motion.button
                type="submit"
                className="w-full px-6 py-4 bg-[#D27D59] text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-[#C86D49] transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send size={20} />
                {t.sendMessage}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="glass-container p-8 rounded-3xl">
              <h2 className="text-2xl font-bold text-[#1F1F1F] mb-6">{t.contactInformation}</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl glass-container-strong flex items-center justify-center flex-shrink-0">
                    <Mail className="text-[#D27D59]" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1F1F1F] mb-1">Email</h3>
                    <p className="text-[#1F1F1F]">contact@elabsoft.studio</p>
                    <p className="text-[#1F1F1F]">hello@elabsoft.studio</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl glass-container-strong flex items-center justify-center flex-shrink-0">
                    <Phone className="text-[#D27D59]" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1F1F1F] mb-1">{t.phone}</h3>
                    <p className="text-[#1F1F1F]">+1 (555) 123-4567</p>
                    <p className="text-[#1F1F1F]">+1 (555) 987-6543</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl glass-container-strong flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-[#D27D59]" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1F1F1F] mb-1">{t.location}</h3>
                    <p className="text-[#1F1F1F]">123 Innovation Drive</p>
                    <p className="text-[#1F1F1F]">Tech Valley, CA 94000</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-container p-8 rounded-3xl">
              <h3 className="text-xl font-bold text-[#1F1F1F] mb-4">{t.officeHours}</h3>
              <div className="space-y-3 text-[#1F1F1F]">
                <div className="flex justify-between">
                  <span>{t.mondayFriday}</span>
                  <span className="font-semibold text-[#1F1F1F]">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>{t.saturday}</span>
                  <span className="font-semibold text-[#1F1F1F]">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>{t.sunday}</span>
                  <span className="font-semibold text-[#1F1F1F]">{t.closed}</span>
                </div>
              </div>
            </div>

            <motion.div
              className="glass-container p-8 rounded-3xl bg-gradient-to-br from-[#D27D59]/20 to-transparent"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-bold text-[#1F1F1F] mb-2">{t.readyToStart}</h3>
              <p className="text-[#1F1F1F] mb-4">
                {t.ctaText}
              </p>
              <div className="text-[#D27D59] font-medium">
                {t.responseTime}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
