import Image from "next/image";
import { motion } from "framer-motion";

interface PageHeroProps {
  title: string;
  subtitle: string;
  bgImage: string;
}

const PageHero = ({ title, subtitle, bgImage }: PageHeroProps) => (
  <section className="relative py-16 sm:py-20 md:py-28 text-center text-primary-foreground overflow-hidden">
    {/* Background image */}
    <Image src={bgImage} alt="" fill sizes="100vw" priority className="object-cover" />
    {/* Brand color mask overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-[hsl(195,70%,18%,0.85)] to-[hsl(174,65%,30%,0.8)]" />
    <div className="container relative z-10">
      <motion.h1
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4"
      >
        {title}
      </motion.h1>
      <motion.p
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="opacity-90 max-w-2xl mx-auto text-base sm:text-lg"
      >
        {subtitle}
      </motion.p>
    </div>
  </section>
);

export default PageHero;
