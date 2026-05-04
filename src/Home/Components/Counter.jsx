import React from "react";
import { Briefcase, Check, Gem, Heart } from "lucide-react";

const Counter = () => {
  return (
    <>
      <section className="counter-section section-padding">
        <div className="container">
          <div className="row">
            {/* <!-- Counter Item --> */}
            <div className="col-md-3 col-sm-6 work-counter-widget text-center">
              <div className="counter wow fadeInDown" data-wow-delay="0.3s">
                <div className="icon">
                  <Briefcase className="mx-auto" size={32} />
                </div>
                <div className="counterUp">250</div>
                <p>Project Working</p>
              </div>
            </div>
            {/* <!-- Counter Item --> */}
            <div className="col-md-3 col-sm-6 work-counter-widget text-center">
              <div className="counter wow fadeInDown" data-wow-delay="0.6s">
                <div className="icon">
                  <Check className="mx-auto" size={32} />
                </div>
                <div className="counterUp">950</div>
                <p>Project Done</p>
              </div>
            </div>
            {/* <!-- Counter Item --> */}
            <div className="col-md-3 col-sm-6 work-counter-widget text-center">
              <div className="counter wow fadeInDown" data-wow-delay="0.9s">
                <div className="icon">
                  <Gem className="mx-auto" size={32} />
                </div>
                <div className="counterUp">150</div>
                <p>Awards Received</p>
              </div>
            </div>
            {/* <!-- Counter Item --> */}
            <div className="col-md-3 col-sm-6 work-counter-widget text-center">
              <div className="counter wow fadeInDown" data-wow-delay="1.2s">
                <div className="icon">
                  <Heart className="mx-auto" size={32} />
                </div>
                <div className="counterUp">299</div>
                <p>Happy Clients</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Counter