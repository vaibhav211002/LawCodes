import React from 'react'
import "./style.scss"
import { SocialIcon } from 'react-social-icons'



function Footer() {
  return (
    <div>
        <footer>
      <p className='footer'>
        <strong>Contribution : </strong>
        <br />
        <strong>Ashutosh Singh</strong> - Legal Advisor <SocialIcon url="https://www.linkedin.com/in/ashutosh-singh-037ab6244?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className='pic' style={{ width: 25, height: 25 }}/>
        <br />
        <strong>Vaibhav Bhatt</strong> - Developer  <SocialIcon url="https://www.linkedin.com/in/vaibhav-bhatt-900b46210/" className='pic' style={{ width: 25, height: 25 }} /> 
        <br />
        <p>This Website is in the development phase , even your smallest Contribution can help us to improve the performance.</p>
      </p>
    </footer>
    </div>
  )
}

export default Footer