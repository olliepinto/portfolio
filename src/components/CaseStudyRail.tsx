import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import data from '../data/portfolio.json';

export default function CaseStudyRail() {
  return (
    <section
      id="work"
      className="w-full py-24 border-t border-border-color overflow-hidden bg-surface/30"
    >
      <div className="max-w-[1280px] mx-auto px-6 mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-text-primary">
            Selected Work
          </h2>
          <p className="text-text-muted">
            Data-driven campaigns & automation architecture.
          </p>
        </div>
        <div className="hidden md:block text-xs font-mono text-text-muted opacity-50">
          {'SCROLL >>>'}
        </div>
      </div>

      <div className="flex overflow-x-auto pb-12 px-6 gap-6 snap-x snap-mandatory no-scrollbar">
        {data.projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="snap-center shrink-0 w-[85vw] md:w-[600px] bg-surface border border-border-color rounded-2xl overflow-hidden group cursor-pointer relative shadow-sm"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div
              className={`h-64 bg-gradient-to-br ${project.color} opacity-90 group-hover:opacity-100 transition-opacity flex items-center justify-center`}
            >
              <span className="text-white/40 font-bold text-4xl">
                {project.client}
              </span>
            </div>

            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-2 flex-wrap">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2 py-1 rounded bg-surface-hover text-text-muted border border-border-color"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <ArrowUpRight className="text-text-primary opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>

              <h3 className="text-2xl font-bold mb-2 text-text-primary group-hover:text-accent-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-4xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-text-primary to-text-muted">
                {project.metric}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
