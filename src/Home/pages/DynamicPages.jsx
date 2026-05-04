import { useParams, useNavigate } from "react-router-dom"; // ✅ added useNavigate
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { homeCmsApi } from "../../services/home/home-cms-api";

function DynamicPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true);
        setNotFound(false);

        const res = await homeCmsApi.getPageByUrl(slug);

        if (res.success) {
          setPage(res.data);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        // ✅ 404 from server means page doesn't exist
        if (error.response?.status === 404) {
          setNotFound(true);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  // ── Loading ──
  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}
      >
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  // ── 404 ──
  if (notFound || !page) {
    return (
      <div
        style={{ paddingTop: "8rem", paddingBottom: "5rem" }}
        className="text-center  container min-vh-50"
      >
        <h1 className="display-1 fw-bold text-muted">404</h1>
        <h4>Page Not Found</h4>
        <p className="text-muted">The page you're looking for doesn't exist.</p>
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Go Home
        </button>
      </div>
    );
  }

  // ── Render Page ──
  return (
    <>
      <Helmet>
        <title>{page.meta_title || page.title || "Page"}</title>
        {/* ✅ correct field names from your schema */}
        <meta name="description" content={page.meta_description || ""} />
        <meta name="keywords" content={page.meta_keywords || ""} />
        {page.styles && <style>{page.styles}</style>}
      </Helmet>

      {/* Breadcrumb banner */}
      {page.breadcrumb && (
        <div
          style={{
            backgroundImage: `url(${page.breadcrumb})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1 className="text-white fw-bold">{page.heading || page.name}</h1>
        </div>
      )}

      {/* ✅ renders HTML content from DB */}
      <div className="container ">
        <div dangerouslySetInnerHTML={{ __html: page.content }} />
      </div>
    </>
  );
}

export default DynamicPage;
