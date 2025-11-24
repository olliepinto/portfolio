import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, User, Zap, GraduationCap, Clapperboard, Smile, ExternalLink } from 'lucide-react';
import data from '../data/portfolio.json';

const Card = ({ className, children, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay }}
    // FIX: Added 'flicker-fix' class here
    className={`bg-surface border border-border-color rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flicker-fix ${className}`}
  >
    {children}
  </motion.div>
);

const getPillStyle = (color: string) => {
  switch(color) {
    case 'blue': return 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800';
    case 'emerald': return 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800';
    case 'orange': return 'bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800';
    default: return 'bg-surface-hover text-text-muted border-border-color';
  }
};

export default function BentoGrid() {
  const profile = data.bento.find(item => item.id === 'profile');
  const toolkit = data.bento.find(item => item.id === 'toolkit');
  const creative = data.bento.find(item => item.id === 'creative');
  const university = data.bento.find(item => item.id === 'university');
  const interests = data.bento.find(item => item.id === 'interests');
  const substack = data.bento.find(item => item.id === 'substack');

  return (
    <section id="about" className="w-full max-w-[1280px] px-6 py-24 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
        
        {/* 1. Profile Card */}
        <Card className="md:col-span-2 flex flex-col justify-between h-full" delay={0.1}>
           <div className="flex justify-between items-start mb-4">
             <div className="p-3 bg-surface-hover border border-border-color rounded-full w-fit"><User size={24} className="text-accent-secondary" /></div>
             <div className="flex items-center gap-2 px-3 py-1 bg-surface-hover border border-border-color rounded-full">
                <MapPin size={12} className="text-accent-secondary" />
                <span className="text-xs font-medium text-text-muted lowercase font-sans">london, uk</span>
             </div>
           </div>
           <div>
              <h3 className="text-3xl font-bold mb-2 text-text-primary font-sans">{profile?.content.title}</h3>
              <p className="text-text-muted font-medium font-sans text-lg">{profile?.content.role}</p>
              <p className="mt-4 text-sm text-text-muted opacity-80 leading-relaxed font-sans max-w-lg">{profile?.content.bio}</p>
           </div>
        </Card>

        {/* 2. Interests Card */}
        <Card className="md:col-span-1 flex flex-col justify-center items-center text-center bg-surface-hover/30" delay={0.2}>
           <div className="flex items-center gap-3 mb-4">
             <Smile size={24} className="text-accent-secondary" />
           </div>
           <h4 className="text-lg font-bold text-text-primary mb-2 font-sans">{interests?.content.title}</h4>
           <p className="text-xs text-text-muted leading-relaxed font-sans">{interests?.content.text}</p>
        </Card>

        {/* 3. Toolkit */}
        <Card className="md:col-span-3" delay={0.3}>
          <h4 className="text-sm font-bold text-text-primary mb-6 lowercase font-sans">{toolkit?.content.title}</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {toolkit?.content.categories.map((cat: any) => (
              <div key={cat.name}>
                <h5 className="text-sm font-bold text-text-muted mb-3 lowercase font-sans">{cat.name}</h5>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item: string) => (
                    <span key={item} className={`px-3 py-1 text-xs font-medium border rounded-full lowercase transition-colors font-sans ${getPillStyle(cat.color)}`}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* 4. Creative Background */}
        <Card className="md:col-span-2" delay={0.4}>
           <div className="flex items-center gap-3 mb-4">
             <Clapperboard size={20} className="text-accent-secondary" />
             <h4 className="text-lg font-bold text-text-primary font-sans">{creative?.content.title}</h4>
           </div>
           <p className="text-sm text-text-muted leading-relaxed font-sans">{creative?.content.text}</p>
        </Card>

        {/* 5. University Card */}
        <Card className="md:col-span-1 flex flex-col justify-center items-center text-center bg-surface" delay={0.5}>
           <div className="p-3 bg-surface-hover border border-border-color rounded-full mb-4">
             <GraduationCap size={24} className="text-accent-secondary" />
           </div>
           <h4 className="text-lg font-bold text-text-primary leading-tight mb-1 font-sans">{university?.content.degree}</h4>
           
           <span className="text-xs font-medium text-accent-secondary mb-4 lowercase font-sans bg-accent-primary/20 px-2 py-0.5 rounded-full">
             {university?.content.grade}
           </span>
           
           <p className="text-xs text-text-muted leading-relaxed font-sans opacity-80">{university?.content.desc}</p>
        </Card>

        {/* 6. Substack Strip */}
        <Card className="md:col-span-3 flex items-center justify-between bg-accent-secondary/5 border-accent-secondary/20" delay={0.6}>
           <div className="flex items-center gap-4">
              <div className="p-2 bg-white dark:bg-black rounded-lg border border-accent-secondary/20">
                <Zap size={20} className="text-accent-secondary fill-current" />
              </div>
              <div>
                <p className="text-xs font-medium text-accent-secondary mb-0.5 lowercase font-sans">{substack?.content.label}</p>
                <h4 className="text-lg font-bold text-text-primary font-sans">{substack?.content.title}</h4>
              </div>
           </div>
           <a 
             href={substack?.content.url} 
             target="_blank" 
             rel="noopener noreferrer"
             className="flex items-center gap-2 text-sm font-bold px-5 py-2 bg-surface border border-border-color rounded-full hover:border-accent-secondary transition-all group lowercase font-sans"
           >
             {substack?.content.link_text} <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
           </a>
        </Card>

      </div>
    </section>
  );
}