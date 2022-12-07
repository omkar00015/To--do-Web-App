import React from 'react'
import './Contact.css';

export default function Contact() {
  return (
    <>
        <div className='devName'>
            <h2>Developer - </h2>
            <p>Dharanendra L V.</p>
        </div>
        <h2 className='socialHead'>Social Media Handles - </h2>
        <div className='socialMedia'>
            <div className='medias'>
              <a href="https://www.instagram.com/dharanendra.l.v/" target="_blank" className='icons'><i className="fa-brands fa-instagram"></i></a>
              <p>@dharanendra.l.v</p>
            </div>
            <div className='medias'>
              <a href="https://github.com/dharanendra23" target="_blank" className='icons'><i className="fa-brands fa-github"></i></a>
              <p>@dharanendra23</p>
            </div>

            <div className='medias'>
              <a href='https://www.linkedin.com/in/dharanendra-l-v-a10b401b2/' target="_blank" className='icons'><i className="fa-brands fa-linkedin"></i></a>
              <p>@dharanendra l v</p>
            </div>

            <div className='medias'>
              <a href='' className='icons' target="_blank"><i className="fa-brands fa-google"></i></a>
              <p>dharanendra.lv100@gmail.com</p>
            </div>
        </div>
    </>
  )
}
