import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import PageHero from "@/components/PageHero";
const heroImg = "/assets/page-hero-portfolio.jpg";
import ProjectArtwork from "@/components/ProjectArtwork";

const projects = [
  { title: "Lilongwe City Land Audit", category: "GIS Projects", desc: "Comprehensive GIS-based land audit for the Lilongwe City Council covering over 500 parcels.", tools: "QGIS, Google Earth, GPS" },
  { title: "Area 25 Housing Estate Survey", category: "Survey Projects", desc: "Full cadastral survey for a 200-unit housing development in Area 25.", tools: "Total Station, GNSS, AutoCAD" },
  { title: "Commercial Complex Design", category: "Architectural Designs", desc: "Designed a modern 3-storey commercial complex in Lilongwe's City Centre.", tools: "AutoCAD, Revit, SketchUp" },
  { title: "Mangochi Lakeshore Mapping", category: "GIS Projects", desc: "Drone-based mapping of lakeshore properties for environmental impact assessment.", tools: "DJI Phantom, Pix4D, QGIS" },
  { title: "Salima Property Management", category: "Property Management", desc: "Managed a portfolio of 50+ rental properties in Salima district.", tools: "Custom Property Management System" },
  { title: "Mzuzu Town Planning Survey", category: "Survey Projects", desc: "Topographic survey supporting the Mzuzu town expansion master plan.", tools: "GNSS, LiDAR, ArcGIS" },
];

const categories = ["All", "GIS Projects", "Survey Projects", "Architectural Designs", "Property Management"];

import { useState } from "react";

const Portfolio = () => {
  const [cat, setCat] = useState("All");
  const filtered = cat === "All" ? projects : projects.filter(p => p.category === cat);

  return (
    <Layout>
      <SEO
        title="Portfolio | Geoking Consultancy Projects in Malawi"
        description="Explore Geoking's completed GIS, surveying, architectural and property management projects delivered across Lilongwe, Mzuzu, Mangochi and beyond."
        canonical="/portfolio"
      />
      <PageHero title="Portfolio" subtitle="Explore our completed projects across Malawi." bgImage={heroImg} />

      <section className="py-12 sm:py-20">
        <div className="container">
          <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"><div className="max-w-xl"><p className="section-label mb-3">From insight to impact</p><h2 className="font-heading text-3xl font-semibold text-secondary sm:text-4xl">Our work, on the ground.</h2><p className="mt-4 text-muted-foreground">Explore the mapping, surveying, design and property work behind our projects across Malawi.</p></div><p className="text-sm text-muted-foreground">{filtered.length} projects · {cat === 'All' ? 'All disciplines' : cat}</p></div>
          <div className="mb-9 flex flex-wrap gap-2" aria-label="Filter portfolio projects">{categories.map(c => <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)} className={`min-h-11 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${cat === c ? 'border-primary bg-primary text-white' : 'border-border bg-white text-secondary hover:border-primary/40'}`}>{c}</button>)}</div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{filtered.map(project => <article key={project.title} className="group overflow-hidden rounded-2xl border border-primary/15 bg-white transition-shadow hover:shadow-lg hover:shadow-secondary/5"><div className="relative overflow-hidden border-b border-primary/10"><ProjectArtwork category={project.category} title={project.title}/><span className="absolute bottom-4 left-4 rounded-full border border-white/60 bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-secondary backdrop-blur">{project.category}</span></div><div className="p-6 sm:p-7"><h3 className="font-heading text-xl font-semibold leading-snug text-secondary">{project.title}</h3><p className="mt-3 min-h-[4.5rem] text-sm leading-relaxed text-muted-foreground">{project.desc}</p><div className="mt-6 border-t border-primary/10 pt-4"><p className="mb-3 text-[10px] font-semibold uppercase tracking-[.16em] text-muted-foreground">Tools & methods</p><ul className="flex flex-wrap gap-2">{project.tools.split(', ').map(tool => <li key={tool} className="rounded-md bg-primary/5 px-2.5 py-1.5 text-[11px] font-medium text-primary">{tool}</li>)}</ul></div></div></article>)}</div>
          <p className="mt-5 text-xs text-muted-foreground">Illustrations represent each project discipline.</p>
        </div>
      </section>
    </Layout>
  );
};

export default Portfolio;

