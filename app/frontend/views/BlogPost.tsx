import { posts } from "../../content/posts";
import Layout from "@/components/Layout";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, User } from "lucide-react";



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

