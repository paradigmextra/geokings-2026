import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, User } from "lucide-react";

const posts = [
  { slug: "understanding-malawi-land-laws", title: "Understanding Malawi's Land Laws: A Complete Guide", excerpt: "A comprehensive overview of the Land Act 2016 and what it means for property owners in Malawi.", date: "Jan 15, 2026", author: "Geoking Team", category: "Land Laws" },
  { slug: "gis-technology-agriculture", title: "How GIS Technology is Transforming Agriculture in Malawi", excerpt: "Exploring the role of geospatial technology in precision farming and crop management.", date: "Feb 3, 2026", author: "Geoking Team", category: "GIS Technology" },
  { slug: "property-valuation-guide", title: "Property Valuation: What Every Buyer Should Know", excerpt: "Key factors that influence property values and why professional valuation matters.", date: "Feb 10, 2026", author: "Geoking Team", category: "Property" },
  { slug: "urban-planning-lilongwe", title: "Urban Planning Challenges in Lilongwe", excerpt: "How geospatial data can help address rapid urbanization in Malawi's capital city.", date: "Feb 15, 2026", author: "Geoking Team", category: "Urban Planning" },
];

const Blog = () => (
  <Layout>
    <section className="page-hero">
      <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Blog & Insights</h1>
      <p className="opacity-90">Articles on land, property, GIS technology, and more.</p>
    </section>

    <section className="py-20">
      <div className="container">
        <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {posts.map(p => (
            <article key={p.slug} className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-40 hero-gradient flex items-center justify-center">
                <span className="text-primary-foreground/50 font-heading text-lg">{p.category}</span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{p.date}</span>
                  <span className="flex items-center gap-1"><User className="w-3 h-3" />{p.author}</span>
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{p.excerpt}</p>
                <Link to={`/blog/${p.slug}`} className="text-accent text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all">
                  Read More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Blog;
