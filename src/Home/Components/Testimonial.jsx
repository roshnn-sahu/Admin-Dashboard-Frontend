import React from "react";
// core version + navigation, pagination modules:
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Testimonial = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Product Manager, TechNova",
      feedback:
        "MeetMe has completely transformed the way our team collaborates. We can now move from idea to launch twice as fast!",
    },
    {
      name: "Rahul Verma",
      role: "CTO, DevSphere",
      feedback:
        "The performance and reliability of MeetMe are outstanding. Our developers love how smooth and efficient the platform is.",
    },
    {
      name: "Anjali Gupta",
      role: "Founder, Innovexa",
      feedback:
        "MeetMe eliminates all the operational overhead. It lets our team focus entirely on customer experience and innovation.",
    },
  ];
  return (
    <>
      <div
        id="testimonial"
        className="section-padding  d-flex bg-light mt-5"
        style={{ minHeight: "500px" }}
      >
        <div className="container m-auto">
          <div className="row">
            <div className="col-lg-5">
              <span className="text-success px-3 rounded-5 border border-success">
                Testimonial
              </span>
              <h1>What People Say!</h1>
              <p>
                Our clients’ success stories inspire everything we do. Hear what
                they have to say about their experience with MeetMe—from smooth
                collaboration and outstanding support to the real impact our
                platform made on their business growth. Every testimonial
                reflects our commitment to innovation, reliability, and customer
                satisfaction.
              </p>
            </div>
            <div className="col-lg-7">
              <div>
                <Swiper
                  modules={[ Autoplay]}
                  loop={true}
                  spaceBetween={30}
                  slidesPerView={2}
                               autoplay={{ delay: 4000, disableOnInteraction: false }}
                >
                  {testimonials.map((item, index) => (
                    <SwiperSlide key={index}>
                      <div
                        className="p-4 bg-white rounded-4  mx-auto"
                        style={{ maxWidth: "600px" }}
                      >
                        <p className="text-muted fst-italic mb-4">
                          “{item.feedback}”
                        </p>
                        <h5 className="fw-bold mb-0">{item.name}</h5>
                        <small className="text-secondary">{item.role}</small>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;
