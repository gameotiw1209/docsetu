import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BabyIcon, CarIcon, CreditCardIcon, FileTextIcon, LandmarkIcon, PlaneIcon, VoteIcon, ArrowUpRightIcon, BoxIcon } from "lucide-react";
import { services } from "../data/services";
const iconMap: Record<string, BoxIcon> = {
  CreditCard: CreditCardIcon,
  Plane: PlaneIcon,
  Car: CarIcon,
  Vote: VoteIcon,
  Landmark: LandmarkIcon,
  Baby: BabyIcon,
  FileText: FileTextIcon
};
export function ServiceCards() {
  return <section id="docinfo" className="w-full px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <motion.h2 initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true,
        amount: 0.4
      }} transition={{
        duration: 0.5,
        ease: 'easeOut'
      }} className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          What do you need documents for?
        </motion.h2>
        <p className="mt-3 max-w-xl text-slate-600 dark:text-slate-400">
          Pick a service to see the exact checklist, then tick items off as you gather them.
        </p>

        <motion.ul initial="hidden" whileInView="visible" viewport={{
        once: true,
        amount: 0.15
      }} variants={{
        visible: {
          transition: {
            staggerChildren: 0.07
          }
        }
      }} className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
          const Icon = iconMap[service.icon] ?? FileTextIcon;
          return <motion.li key={service.slug} variants={{
            hidden: {
              opacity: 0,
              y: 22
            },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.45,
                ease: 'easeOut'
              }
            }
          }}>
                <Link to={`/service/${service.slug}`} className="group flex h-full flex-col rounded-2xl border border-slate-900/10 bg-white/60 p-6 backdrop-blur-lg transition-colors hover:border-saffron/60 dark:border-white/10 dark:bg-white/5 dark:hover:border-saffron/50">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-saffron/40 bg-saffron/10 text-saffron">
                    <Icon size={18} />
                  </span>
                  <h3 className="mt-5 flex items-center gap-1.5 font-display text-lg font-semibold">
                    {service.name}
                    <ArrowUpRightIcon size={15} className="text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-saffron" />
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {service.short}
                  </p>
                </Link>
              </motion.li>;
        })}
        </motion.ul>
      </div>
    </section>;
}