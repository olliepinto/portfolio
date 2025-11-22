import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, User, Zap, Palette } from 'lucide-react';
import data from '../data/portfolio.json';

const Card = ({ className, children, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className={`bg-surface border border-border-color rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow ${className}`}
  >
    {children}
  </motion.div>
);

export default function BentoGrid() {
  return (
    <section id="about" className="w-full max-w-[1280px] px-6 py-24 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-full">
        {/* Profile */}
        <Card
          className="md:col-span-2 md:row-span-2 flex flex-col justify-between"
          delay={0.1}
        >
          <div className="p-3 bg-surface-hover border border-border-color rounded-full w-fit">
            <User size={24} className="text-accent-primary" />
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-2 text-text-primary">
              {data.bento[0].content.title}
            </h3>
            <p className="text-text-muted font-medium">
              {data.bento[0].content.role}
            </p>
            <p className="mt-4 text-sm text-text-muted opacity-80 leading-relaxed">
              {data.bento[0].content.bio}
            </p>
          </div>
        </Card>

        {/* Location */}
        <Card
          className="md:col-span-1 md:row-span-1 flex flex-col items-center text-center justify-center"
          delay={0.2}
        >
          <MapPin className="mb-2 text-accent-secondary" />
          <h4 className="text-lg font-bold text-text-primary">London, UK</h4>
        </Card>

        {/* Tech Stack */}
        <Card className="md:col-span-1 md:row-span-1" delay={0.3}>
          <h4 className="text-xs font-mono text-text-muted mb-4 uppercase">
            Toolkit
          </h4>
          <div className="flex flex-wrap gap-2">
            {data.bento[1].content.items.map((item: string) => (
              <span
                key={item}
                className="px-2 py-1 text-xs bg-surface-hover border border-border-color rounded text-text-primary"
              >
                {item}
              </span>
            ))}
          </div>
        </Card>

        {/* Creative Roots (Replaces Mindfulness) */}
        <Card
          className="md:col-span-1 md:row-span-1 flex flex-col justify-center items-center bg-surface-hover/50"
          delay={0.4}
        >
          <Palette className="mb-2 text-text-primary" />
          <p className="text-sm font-medium text-center">Creative Roots</p>
          <span className="text-xs text-text-muted mt-1">
            Video & Motion BG
          </span>
        </Card>

        {/* Current Focus */}
        <Card
          className="md:col-span-2 md:row-span-1 flex items-center justify-between"
          delay={0.5}
        >
          <div>
            <p className="text-xs font-mono text-accent-primary mb-1">
              CURRENTLY WRITING
            </p>
            <h4 className="text-xl font-bold flex items-center gap-2 text-text-primary">
              Living Prototype{' '}
              <Zap size={16} className="text-accent-secondary" />
            </h4>
          </div>
          <a
            href="#"
            className="text-xs font-bold px-3 py-1 bg-surface-hover border border-border-color rounded-full hover:bg-accent-primary hover:text-white transition-colors"
          >
            Read Substack
          </a>
        </Card>
      </div>
    </section>
  );
}
