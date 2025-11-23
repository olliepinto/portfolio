import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, Calendar, ChevronRight } from 'lucide-react';
import data from '../data/portfolio.json';

export default function WorkGrid() {
  const [selectedProject, setSelectedProject] = useState<any>(null);

  return (
    <section id="work" className="w-full py-24 border-t border-border-color bg-surface/30">
      <div className="max-w-[1280px] mx-auto px-6 mb-12">
         {/* Main Section Heading remains standard */}
         <h2 className="text-3xl md:text-5xl font-serif font-normal tracking-wide mb-2 text-text-primary">{data.work.headline}</h2>
         <p className="text-text-muted font-sans">{data.work.subheadline}</p>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.work.projects.map((project, index) => (
          <motion.div 
            key={project.id}
            onClick={() => setSelectedProject(project)}
            // FIX: changed hover:border-accent-primary to hover:border-accent-secondary (Orange)
            className="bg-surface border border-border-color rounded-2xl p-8 cursor-pointer hover:shadow-lg hover:border-accent-secondary/30 transition-all group h-full flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="flex justify-between items-start mb-6">
               <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag: string) => (
                    <span key={tag} className="text-[10px] font-medium px-2 py-1 rounded-full bg-surface-hover text-text-muted border border-border-color lowercase font-sans">{tag}</span>
                  ))}
               </div>
               {/* FIX: Arrow icon turns Orange on hover */}
               <ArrowUpRight className="text-text-muted opacity-50 group-hover:text-accent-secondary group-hover:opacity-100 transition-all" />
            </div>
            
            {/* FIX: Title turns Orange on hover */}
            <h3 className="text-2xl font-sans font-bold mb-2 text-text-primary group-hover:text-accent-secondary transition-colors">{project.client}</h3>
            
            <p className="text-sm font-medium text-text-muted mb-4 font-sans">{project.role}</p>
            <p className="text-text-primary/80 leading-relaxed mt-auto font-sans text-sm">
              {project.short_desc}
            </p>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-bg-depth/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-surface border border-border-color rounded-3xl p-8 md:p-12 max-w-2xl w-full shadow-2xl relative overflow-y-auto max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 bg-surface-hover rounded-full hover:bg-border-color transition-colors"
              >
                <X size={20} />
              </button>

              <div className="mb-2 flex items-center gap-2 text-text-muted font-sans text-sm">
                <Calendar size={14} />
                <span>{selectedProject.period}</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-sans font-bold mb-2 text-text-primary">{selectedProject.client}</h2>
              
              {/* FIX: Role Title is now Orange (accent-secondary) */}
              <h3 className="text-xl text-accent-secondary font-medium mb-8 font-sans">{selectedProject.role}</h3>

              <div className="space-y-6">
                <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.tags.map((tag: string) => (
                      <span key={tag} className="text-sm font-medium px-4 py-1.5 rounded-full bg-surface-hover text-text-primary border border-border-color lowercase font-sans">{tag}</span>
                    ))}
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-text-muted font-sans">Key Contributions</h4>
                  <ul className="space-y-3">
                    {selectedProject.full_desc.map((point: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-text-primary leading-relaxed font-sans">
                        <ChevronRight size={18} className="text-accent-secondary mt-1 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}