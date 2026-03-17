import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, Calendar, ChevronRight } from "lucide-react";
import data from "../data/portfolio.json";
import { enableModalAccessibility, getModalRoot } from "./modalUtils";

type Project = (typeof data.work.projects)[number];

export default function CaseStudyRail() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalRoot = getModalRoot();

  const closeProject = () => setSelectedProject(null);

  useEffect(() => {
    if (!selectedProject) {
      return;
    }

    return enableModalAccessibility({
      dialogRef,
      closeButtonRef,
      onClose: closeProject,
    });
  }, [selectedProject]);

  const modalMarkup = (
    <AnimatePresence>
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeProject}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-bg-depth/80 backdrop-blur-sm"
        >
          <motion.div
            ref={dialogRef}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-detail-title"
            aria-describedby="project-detail-description"
            id="project-detail-dialog"
            className="bg-surface border border-border-color rounded-3xl p-8 md:p-12 max-w-2xl w-full shadow-2xl relative overflow-y-auto max-h-[90vh]"
          >
            <button
              ref={closeButtonRef}
              onClick={closeProject}
              type="button"
              aria-label="Close project details"
              className="absolute top-6 right-6 p-2 bg-surface-hover rounded-full hover:bg-border-color transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary"
            >
              <X size={20} />
            </button>

            <div className="mb-2 flex items-center gap-2 text-text-muted font-sans text-sm">
              <Calendar size={14} />
              <span>{selectedProject.period}</span>
            </div>

            <h2
              id="project-detail-title"
              className="text-3xl md:text-4xl font-sans font-bold mb-2 text-text-primary"
            >
              {selectedProject.client}
            </h2>

            <h3
              id="project-detail-description"
              className="text-xl text-accent-secondary font-medium mb-8 font-sans"
            >
              {selectedProject.role}
            </h3>

            <div className="space-y-6">
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="text-sm font-medium px-4 py-1.5 rounded-full bg-surface-hover text-text-primary border border-border-color lowercase font-sans"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-widest text-text-muted font-sans">
                  Key Contributions
                </h4>
                <ul className="space-y-3">
                  {selectedProject.full_desc.map(
                    (point: string, index: number) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-text-primary leading-relaxed font-sans"
                      >
                        <ChevronRight
                          size={18}
                          className="text-accent-secondary mt-1 shrink-0"
                        />
                        <span>{point}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <section
      id="work"
      className="w-full py-24 border-t border-border-color bg-surface/30"
    >
      <div className="max-w-[1280px] mx-auto px-6 mb-12">
        <h2 className="text-3xl md:text-5xl font-serif font-normal tracking-wide mb-2 text-text-primary">
          {data.work.headline}
        </h2>
        <p className="text-text-muted font-sans">{data.work.subheadline}</p>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.work.projects.map((project, index) => (
          <motion.button
            key={project.id}
            onClick={() => setSelectedProject(project)}
            type="button"
            aria-haspopup="dialog"
            aria-controls="project-detail-dialog"
            aria-label={`View case study details for ${project.client}`}
            className={`bg-surface border border-border-color rounded-2xl p-8 cursor-pointer hover:shadow-lg hover:border-accent-secondary/30 transition-colors transition-shadow duration-300 group h-full flex flex-col flicker-fix text-left ${project.id === "early-career" ? "md:col-span-2 lg:col-span-3" : ""}`}
            initial={{ opacity: 0, y: 20, z: 0 }}
            whileInView={{ opacity: 1, y: 0, z: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="text-[10px] font-medium px-2 py-1 rounded-full bg-surface-hover text-text-muted border border-border-color lowercase font-sans"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <ArrowUpRight className="text-text-muted opacity-50 group-hover:text-accent-secondary group-hover:opacity-100 transition-all" />
            </div>

            <h3 className="text-2xl font-sans font-bold mb-2 text-text-primary group-hover:text-accent-secondary transition-colors">
              {project.client}
            </h3>

            <p className="text-sm font-medium text-text-muted mb-4 font-sans">
              {project.role}
            </p>
            <p className="text-text-primary/80 leading-relaxed mt-auto font-sans text-sm">
              {project.short_desc}
            </p>
          </motion.button>
        ))}
      </div>

      {modalRoot ? createPortal(modalMarkup, modalRoot) : modalMarkup}
    </section>
  );
}
