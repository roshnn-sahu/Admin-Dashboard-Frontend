import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";

function DynamicPage() {
  const { slug } = useParams();
  const [page, setPage] = useState(null);

  useEffect(() => {
    axios.get(`/api/pages/${slug}`)
      .then(res => setPage(res.data))
      .catch(err => console.error(err));
  }, [slug]);

  if (!page) return <div>Loading...</div>;

  return (
    <>
      <Helmet>
        <title>{page.title}</title>
        <meta name="description" content={page.metaDescription} />
        <meta name="keywords" content={page.metaKeywords} />
      </Helmet>

      <h1>{page.heading}</h1>

      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </>
  );
}

export default DynamicPage;