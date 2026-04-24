import { useState } from "react";

const Portfolio = () => {
  const base = import.meta.env.BASE_URL;

  const portfolioItems = [
    { id: 1, category: "development", img: `${base}assets/img/gallery/img-1.jpg` },
    { id: 2, category: "design", img: `${base}assets/img/gallery/img-2.jpg` },
    { id: 3, category: "development", img: `${base}assets/img/gallery/img-3.jpg` },
    { id: 4, category: "design", img: `${base}assets/img/gallery/img-4.jpg` },
    { id: 5, category: "development", img: `${base}assets/img/gallery/img-5.jpg` },
    { id: 6, category: "print", img: `${base}assets/img/gallery/img-6.jpg` },
  ];

  const [activeFilter, setActiveFilter] = useState("all");

  const filteredItems =
    activeFilter === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter);

  return (
    <section id="portfolios" className="section-padding bg-white mt-5">
      <div className="container">
        <h2 className="section-title text-center mb-4">Portfolio</h2>

        {/* Filter Buttons */}
        <div className="text-center mb-4">
          {["all", "design", "development", "print"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`btn btn-light text-black m-1 ${
                activeFilter === cat ? "btn-dark text-white" : ""
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="row">
          {filteredItems.map((item) => (
            <div key={item.id} className="col-sm-6 col-md-4 col-lg-4 col-xl-4 mb-4">
              <div className="portfolio-item border rounded overflow-hidden">
                <img
                  src={item.img}
                  alt={`Portfolio ${item.id}`}
                  className="img-fluid"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
