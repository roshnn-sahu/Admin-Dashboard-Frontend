
import React from 'react'

const Cta = () => {
  return (
  <>
    <section id="contact" className="services  p-5">
        <div className="contact-form">
          <div className="container">


            <div
              className="row contact-form-area wow fadeInUp rounded-3"
              data-wow-delay="0.4s"
            >
                <h1 className='fw-semibold text-center '>Ready to ship faster?</h1>
                <p className='text-center text-dark fs-6'>Join thousands of teams already building with MeetMe. Start your free trial today.</p>
   <div className='d-flex gap-3 justify-content-center'>

    <a type="button" className="btn btn-light text-black">Take A Look</a>
<a href='#contact' type="button" className="btn btn-dark">Contact Us</a>
   </div>
            
            </div>
          </div>
        </div>
      </section>
  </>
  )
}

export default Cta