import { motion } from "framer-motion";

interface PageHeroProps {
  title: string;
  subtitle: string;
  bgImage: string;
}

const PageHero = ({ title, subtitle, bgImage }: PageHeroProps) => (
  <section className="relative py-24 md:py-32 text-center text-primary-foreground overflow-hidden">
    {/* Background image */}
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    />
    {/* Brand color mask overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-[hsl(195,70%,18%,0.85)] to-[hsl(174,65%,30%,0.8)]" />
    <div className="container relative z-10">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-heading text-4xl md:text-5xl font-bold mb-4"
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="opacity-90 max-w-2xl mx-auto text-lg"
      >
        {subtitle}
      </motion.p>
    </div>
  </section>
);

export default PageHero;
