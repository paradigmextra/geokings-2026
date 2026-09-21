import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import PageHero from "@/components/PageHero";
const heroImg = "/assets/page-hero-portfolio.jpg";
import { Map, Building2, PenTool, Compass } from "lucide-react";

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

      <section className="py-20">
        <div className="container">
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {categories.map(c => (
              <button key={c} onClick={() => setCat(c)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${cat === c ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
                {c}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(p => (
              <div key={p.title} className="service-card">
                <span className="text-xs font-semibold text-accent mb-2 block">{p.category}</span>
                <h3 className="font-heading font-semibold text-lg mb-2 text-foreground">{p.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{p.desc}</p>
                <p className="text-xs text-muted-foreground"><strong className="text-foreground">Tools:</strong> {p.tools}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Portfolio;

