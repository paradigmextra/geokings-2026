import Layout from "@/components/Layout";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, User } from "lucide-react";

const BlogPost = () => {
  const { slug } = useParams();

  return (
    <Layout>
      <section className="page-hero">
        <Link to="/blog" className="inline-flex items-center gap-1 text-sm opacity-80 hover:opacity-100 mb-4 text-primary-foreground">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
        <h1 className="font-heading text-3xl md:text-4xl font-bold">Blog Article</h1>
      </section>

      <section className="py-20">
        <div className="container max-w-3xl">
          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-6">
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> Feb 2026</span>
            <span className="flex items-center gap-1"><User className="w-4 h-4" /> Geoking Team</span>
          </div>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>This is a placeholder blog post for "{slug}". Content will be added as the blog grows with articles on land laws, GIS technology, property trends in Malawi, surveying techniques, and urban planning insights.</p>
            <p>Geoking GIS Consultancy is committed to sharing knowledge and insights that help property owners, surveyors, and development professionals stay informed about the latest trends and regulations in Malawi's land and property sector.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPost;
