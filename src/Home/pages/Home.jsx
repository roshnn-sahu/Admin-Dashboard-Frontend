import React from "react";
import Cta from "../components/Cta";
import Counter from "../components/Counter";

import Testimonial from "../components/Testimonial";
import Portfolio from "./Portfolio";
import Service from "./Service";
import About from "./About";
import { Globe, MapPin, Mail, Phone } from "lucide-react";
import {
  RiFacebookCircleLine,
  RiInstagramLine,
  RiLinkedinBoxLine,
  RiTwitterXLine,
} from "@remixicon/react";

const Home = () => {
  return (
    <>
      <div id="hero-area" className="hero-area-bg">
        <div className="overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12 text-center">
              <div className="contents">
                <h5 className="script-font wow fadeInUp" data-wow-delay="0.2s">
                  Hi This is
                </h5>
                <h2 className="head-title wow fadeInUp" data-wow-delay="0.4s">
                  Tom Saulnier
                </h2>
                <p className="script-font wow fadeInUp" data-wow-delay="0.6s">
                  Front-end Web Developer and Graphic Designer
                </p>
                <ul className="social-icon wow fadeInUp" data-wow-delay="0.8s">
                  <li>
                    <a className="facebook" href="#">
                      <RiFacebookCircleLine size={20} />
                    </a>
                  </li>
                  <li>
                    <a className="twitter" href="#">
                      <RiTwitterXLine size={20} />
                    </a>
                  </li>
                  <li>
                    <a className="instagram" href="#">
                      <RiInstagramLine size={20} />
                    </a>
                  </li>
                  <li>
                    <a className="linkedin" href="#">
                      <RiLinkedinBoxLine size={20} />
                    </a>
                  </li>
                  <li>
                    <a className="google" href="#">
                      <Globe size={20} />
                    </a>
                  </li>
                </ul>
                <div className="header-button wow fadeInUp" data-wow-delay="1s">
                  <a href="#" className="btn btn-common">
                    Get a Free Quote
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- About Section Start --> */}
      <About />
      {/* <!-- About Section End --> */}

      {/* <!-- Services Section Start --> */}
      <Service />
      {/* <!-- Services Section End --> */}

      {/* <!-- Resume Section Start --> */}
      <Portfolio />
      {/* <!-- Resume Section End --> */}
      {/*  */}
      {/* <!-- Portfolio Section --> */}

      <Testimonial />
      {/* <!-- Portfolio Section Ends -->  */}

      {/* <!-- Counter Area Start--> */}
      <Counter />
      {/* <!-- Counter Area End--> */}

      {/* <!-- Contact Section Start --> */}
      <section id="contact" className="section-padding">
        <div className="contact-form">
          <div className="container">
            <div
              className="row contact-form-area wow fadeInUp mt-0 pt-3"
              data-wow-delay="0.4s"
            >
              <h1 className="text-center mt-3 mb-5 ">Contact</h1>
              <div className="col-md-6 col-lg-6 col-sm-12">
                <div className="contact-block">
                  <h2>Contact Form</h2>
                  <form id="contactForm">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            placeholder="Name"
                            required
                            data-error="Please enter your name"
                          />
                          <div className="help-block with-errors"></div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="text"
                            placeholder="Email"
                            id="email"
                            className="form-control"
                            name="email"
                            required
                            data-error="Please enter your email"
                          />
                          <div className="help-block with-errors"></div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <input
                            type="text"
                            placeholder="Subject"
                            id="msg_subject"
                            className="form-control"
                            required
                            data-error="Please enter your subject"
                          />
                          <div className="help-block with-errors"></div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <textarea
                            className="form-control"
                            id="message"
                            placeholder="Your Message"
                            rows="5"
                            data-error="Write your message"
                            required
                          ></textarea>
                          <div className="help-block with-errors"></div>
                        </div>
                        <div className="submit-button">
                          <button
                            className="btn btn-common"
                            id="submit"
                            type="submit"
                          >
                            Send Message
                          </button>
                          <div
                            id="msgSubmit"
                            className="h3 text-center hidden"
                          ></div>
                          <div className="clearfix"></div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-md-6 col-lg-6 col-sm-12">
                <div className="footer-right-area wow fadeIn">
                  <h2>Contact Address</h2>
                  <div className="footer-right-contact">
                    <div className="single-contact">
                      <div className="contact-icon">
                        <MapPin size={24} />
                      </div>
                      <p>San Francisco, CA</p>
                    </div>
                    <div className="single-contact">
                      <div className="contact-icon">
                        <Mail size={24} />
                      </div>
                      <p>
                        <a href="mailto:hello@tom.com">hello@tom.com</a>
                      </p>
                      <p>
                        <a href="mailto:tomsaulnier@gmail.com">
                          tomsaulnier@gmail.com
                        </a>
                      </p>
                    </div>
                    <div className="single-contact">
                      <div className="contact-icon">
                        <Phone size={24} />
                      </div>
                      <p>
                        <a href="#">+ (00) 123 456 789</a>
                      </p>
                      <p>
                        <a href="#">+ (00) 123 344 789</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <object
                  style={{ border: "0", height: "450px", width: "100%" }}
                  data="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d34015.943594576835!2d-106.43242624069771!3d31.677719472407432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86e75d90e99d597b%3A0x6cd3eb9a9fcd23f1!2sCourtyard+by+Marriott+Ciudad+Juarez!5e0!3m2!1sen!2sbd!4v1533791187584"
                ></object>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Contact Section End --> */}
      <Cta />
      {/* <!-- Footer Section Start --> */}
    </>
  );
};

export default Home;
