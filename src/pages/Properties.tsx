import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import heroImg from "@/assets/page-hero-properties.jpg";
import { MapPin, Building2, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const properties = [
  { id: 1, title: "3 Bedroom House in Area 47", price: "MWK 85,000,000", location: "Area 47, Lilongwe", type: "House", status: "Available", desc: "Modern 3-bedroom house with spacious living areas." },
  { id: 2, title: "Commercial Plot in City Centre", price: "MWK 120,000,000", location: "City Centre, Lilongwe", type: "Commercial", status: "Available", desc: "Prime commercial plot in central business district." },
  { id: 3, title: "Residential Land in Area 25", price: "MWK 15,000,000", location: "Area 25, Lilongwe", type: "Land", status: "Available", desc: "Ready for development residential land." },
  { id: 4, title: "4 Bedroom House in Area 43", price: "MWK 110,000,000", location: "Area 43, Lilongwe", type: "House", status: "Available", desc: "Luxury 4-bedroom home with garden." },
  { id: 5, title: "Warehouse in Kanengo", price: "MWK 200,000,000", location: "Kanengo, Lilongwe", type: "Commercial", status: "Sold", desc: "Large warehouse space in industrial area." },
  { id: 6, title: "Land in Mangochi", price: "MWK 8,000,000", location: "Mangochi", type: "Land", status: "Available", desc: "Lake-view land parcel." },
];

const Properties = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  const filtered = properties.filter(p =>
    (typeFilter === "All" || p.type === typeFilter) &&
    (p.title.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <Layout>
      <PageHero title="Properties" subtitle="Browse our available properties across Malawi." bgImage={heroImg} />

      <section className="py-10">
        <div className="container">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by title or location..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm">
              <option>All</option>
              <option>House</option>
              <option>Land</option>
              <option>Commercial</option>
            </select>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(p => (
              <div key={p.id} className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow">
                <div className="h-48 hero-gradient flex items-center justify-center relative">
                  <Building2 className="w-16 h-16 text-primary-foreground/30" />
                  {p.status === "Sold" && <span className="absolute top-3 right-3 bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded-full font-semibold">Sold</span>}
                </div>
                <div className="p-5">
                  <h3 className="font-heading font-semibold text-foreground mb-1">{p.title}</h3>
                  <p className="text-accent font-bold text-lg mb-1">{p.price}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2"><MapPin className="w-3 h-3" />{p.location}</p>
                  <p className="text-sm text-muted-foreground mb-3">{p.desc}</p>
                  <span className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-full">{p.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Properties;
