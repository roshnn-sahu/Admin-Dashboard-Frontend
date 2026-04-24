import { useState } from "react";
import { toast } from "react-toastify";
const Contact = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleForm = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/create-lead`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!res.ok) {
        const data = await res.json();
        toast.error(data.message);
      }else if(res.ok){
        
        const data = await res.json();
        toast.success(data.message);
        setFormData({
          name:"",
          email:"",
          subject:"",
          message:""
        })
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
console.log(formData)
  return (
    <div className="mt-5">
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
                  <form id="contactForm" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                          disabled={loading?true:false}
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            placeholder="Name"
                            required
                            data-error="Please enter your name"
                            onChange={handleForm}
                            value={formData.name}
                          />
                          <div className="help-block with-errors"></div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                                   disabled={loading?true:false}
                            type="text"
                            placeholder="Email"
                            id="email"
                            className="form-control"
                            name="email"
                            required
                            data-error="Please enter your email"
                            onChange={handleForm}
                                   value={formData.email}
                          />
                          <div className="help-block with-errors"></div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <input
                                   disabled={loading?true:false}
                            type="text"
                            placeholder="Subject"
                            name="subject"
                            id="msg_subject"
                            className="form-control"
                            required
                            data-error="Please enter your subject"
                                 value={formData.subject}
                            onChange={handleForm}
                          />

                          <div className="help-block with-errors"></div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <textarea
                                   disabled={loading?true:false}
                            className="form-control"
                            id="message"
                            name="message"
                            placeholder="Your Message"
                            rows="5"
                            data-error="Write your message"
                            required
                            onChange={handleForm}
                                   value={formData.message}
                          ></textarea>
                          <div className="help-block with-errors"></div>
                        </div>
                        <div className="submit-button">
                          <button
                            disabled={loading ? true : false}
                            className="btn btn-primary w-50"
                            id="submit"
                            type="submit"
                          >
                            {loading ? (
                              <div
                                className="spinner-border spinner-border-sm text-white"
                                role="status"
                              ></div>
                            ) : (
                              "Send message"
                            )}
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
              <div className="col-md-6 col-lg-6 col-sm-12 ">
                <div className="footer-right-area wow fadeIn">
                  <h2>Contact Address</h2>
                  <div className="footer-right-contact">
                    <div className="single-contact">
                      <div className="contact-icon">
                        <i className="fa fa-map-marker"></i>
                      </div>
                      <p>San Francisco, CA</p>
                    </div>
                    <div className="single-contact">
                      <div className="contact-icon">
                        <i className="fa fa-envelope"></i>
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
                        <i className="fa fa-phone"></i>
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
              <div className="col-md-12 mt-3">
                <object
                  style={{ border: "0", height: "450px", width: "100%" }}
                  data="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d34015.943594576835!2d-106.43242624069771!3d31.677719472407432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86e75d90e99d597b%3A0x6cd3eb9a9fcd23f1!2sCourtyard+by+Marriott+Ciudad+Juarez!5e0!3m2!1sen!2sbd!4v1533791187584"
                ></object>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
