import Layout from "@/components/Layout";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, User } from "lucide-react";

type Section = { heading?: string; body: string };
type Post = {
  title: string;
  date: string;
  author: string;
  intro: string;
  sections: Section[];
};

const posts: Record<string, Post> = {
  "understanding-malawi-land-laws": {
    title: "Understanding Malawi's Land Laws: A Complete Guide",
    date: "Jan 15, 2026",
    author: "Geoking Team",
    intro:
      "Malawi's land system has gone through major reforms, but many people still operate using outdated assumptions. The Land Act of 2016 was introduced to improve land governance, increase transparency, and reduce disputes—but challenges still exist today.",
    sections: [
      {
        heading: "Customary vs. Leasehold Land",
        body:
          "One key issue is the difference between customary land and leasehold land. Customary land is managed by traditional authorities and is now legally recognized and can be registered. However, many transactions still happen informally, which creates risks for buyers. Leasehold land offers more security but requires proper documentation and approval.",
      },
      {
        heading: "Fraud and Double Allocation",
        body:
          "Land fraud and double allocation are also increasing concerns. Many buyers rely on incomplete paperwork or verbal agreements, leading to disputes later. It is now essential to verify land ownership through official records and ensure proper surveying.",
      },
      {
        heading: "Digitization of Land Records",
        body:
          "The government is working on digitizing land records to improve transparency, but this system is still developing. This means buyers must take responsibility for proper verification.",
      },
      {
        heading: "Protecting Your Investment",
        body:
          "Before buying land, always confirm ownership, verify boundaries, and ensure the land is not under dispute. Understanding these laws helps protect your investment and avoid costly mistakes.",
      },
    ],
  },
  "gis-technology-agriculture": {
    title: "How GIS Technology is Transforming Agriculture in Malawi",
    date: "Feb 3, 2026",
    author: "Geoking Team",
    intro:
      "Agriculture is the backbone of Malawi's economy, but traditional farming methods are no longer enough to meet current challenges. Geographic Information Systems (GIS) are changing how farming decisions are made.",
    sections: [
      {
        heading: "Data-Driven Decision Making",
        body:
          "GIS allows farmers to collect and analyze data on soil, weather, and crop performance. This enables more accurate, data-driven decisions instead of relying on guesswork.",
      },
      {
        heading: "Precision Farming",
        body:
          "One major benefit is precision farming. Using GPS and satellite data, farmers can identify problem areas and apply resources like water and fertilizer more efficiently. This improves productivity while reducing waste.",
      },
      {
        heading: "Climate Adaptation",
        body:
          "GIS also supports climate adaptation. With unpredictable rainfall and increasing droughts, farmers can use geospatial data to adjust planting schedules and choose better crops.",
      },
      {
        heading: "Reaching Smallholder Farmers",
        body:
          "Efforts are also being made to bring GIS tools to smallholder farmers through mobile technology, making it more accessible across Malawi.",
      },
      {
        heading: "The Future of Farming",
        body:
          "GIS is becoming essential for modern agriculture and will continue to shape the future of farming.",
      },
    ],
  },
  "property-valuation-guide": {
    title: "Property Valuation: What Every Buyer Should Know",
    date: "Feb 10, 2026",
    author: "Geoking Team",
    intro:
      "Property valuation in Malawi is often based on assumptions rather than professional assessment, which creates risks for buyers.",
    sections: [
      {
        heading: "Location Matters Most",
        body:
          "Location is one of the most important factors influencing value. Properties near infrastructure such as roads, schools, and commercial areas tend to be more valuable.",
      },
      {
        heading: "Land Use and Zoning",
        body:
          "Land use and zoning also affect value. Commercial land is typically worth more than residential land, but many buyers fail to verify zoning before purchasing.",
      },
      {
        heading: "Infrastructure and Growth",
        body:
          "Infrastructure availability, such as water and electricity, also plays a major role in determining property prices. In growing areas, prices may increase due to expected development rather than current conditions.",
      },
      {
        heading: "Why Professional Valuation Matters",
        body:
          "Many buyers rely on informal estimates, which can lead to overpaying. Hiring a professional valuer ensures that the property is fairly priced and risks are identified early.",
      },
      {
        heading: "Make Informed Decisions",
        body:
          "Making informed decisions is key to successful property investment.",
      },
    ],
  },
  "urban-planning-lilongwe": {
    title: "Urban Planning Challenges in Lilongwe",
    date: "Feb 15, 2026",
    author: "Geoking Team",
    intro:
      "Lilongwe is growing rapidly, but this growth has created major urban planning challenges. The city is expanding faster than infrastructure development.",
    sections: [
      {
        heading: "Rise of Informal Settlements",
        body:
          "One major issue is the increase in informal settlements, where housing is developed without proper planning or services.",
      },
      {
        heading: "Traffic and Infrastructure",
        body:
          "Traffic congestion is also becoming a serious problem due to limited road infrastructure and poor planning.",
      },
      {
        heading: "The Role of GIS in Planning",
        body:
          "A key challenge is the lack of reliable data for planning. Geographic Information Systems (GIS) can help solve this by providing accurate data on population distribution, land use, and infrastructure needs.",
      },
      {
        heading: "Smarter Zoning and Resource Allocation",
        body:
          "GIS can support better zoning, improved transport planning, and more efficient resource allocation.",
      },
      {
        heading: "A Sustainable Future",
        body:
          "With proper planning and use of data, Lilongwe has the potential to develop into a more organized and sustainable city.",
      },
    ],
  },
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = slug ? posts[slug] : undefined;

  return (
    <Layout>
      <section className="page-hero">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1 text-sm opacity-80 hover:opacity-100 mb-4 text-primary-foreground"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
        <h1 className="font-heading text-3xl md:text-4xl font-bold">
          {post ? post.title : "Blog Article"}
        </h1>
      </section>

      <section className="py-20">
        <div className="container max-w-3xl">
          {post ? (
            <>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8 pb-6 border-b border-border">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" /> {post.author}
                </span>
              </div>

              <p className="text-lg text-foreground/90 leading-relaxed mb-8 font-medium">
                {post.intro}
              </p>

              <div className="space-y-8">
                {post.sections.map((s, i) => (
                  <div key={i}>
                    {s.heading && (
                      <h2 className="font-heading text-2xl font-bold text-foreground mb-3">
                        {s.heading}
                      </h2>
                    )}
                    <p className="text-muted-foreground leading-relaxed">
                      {s.body}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-border">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to all articles
                </Link>
              </div>
            </>
          ) : (
            <div className="text-muted-foreground">
              <p>The article "{slug}" could not be found.</p>
              <Link to="/blog" className="text-accent font-semibold mt-4 inline-block">
                Return to Blog
              </Link>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default BlogPost;
