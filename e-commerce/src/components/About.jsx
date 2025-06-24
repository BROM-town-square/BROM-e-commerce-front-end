import React from 'react'
import logo from '../assets/logo.png'
import apples from '../assets/apples.png'
import bussiness from '../assets/bussines.png'
import transport from '../assets/transport.png'
import money from '../assets/money.png'

const About = () => {
  return (
    <div className='about-container'>
      <h1>What we do?</h1>
      <p>At Taste Town, we've created an environment that thrives on teamwork, where associates can innovate, grow, and have successful careers. Most of our leaders have come up through our ranks. Because of our team's extraordinary efforts, we are a leading innovator in the e‑commerce and grocery industries. </p>
      <img src={logo} alt="Taste Town Logo" className='imageone'/>
      <h1>Our Promise</h1>
      <p>Taste Town is driven by innovation: We deliver the highest quality, freshest food. We create food experiences. We drive simple, healthy solutions that make every day better. You deserve a life that is joyful and delicious, which is why our team and the partners we work with are committed to delivering only the very best to you.</p>
      <h1>Quality Backed by The Experts</h1>
      <img src={apples} alt="Apples image" />
      <p>We want you to know what's really great (and what's not). That's why we have a rating system to guide you to the best fruit, vegetables, and seafood. Our experts taste over 800 fresh products daily and rate them so you always know whats great right now. That's because we're committed to making sure your order is perfect and you're completely satisfied. So if something you receive is ever not up to your standards, let us know and we'll make it right—that's our 100% Happiness Guarantee.</p>
      <h1>Taste Town Business</h1>
      <img src={bussiness} alt="Cakes image" className='imagetwo'/>
      <p>Since 2006, Taste Town has helped businesses fuel happy workdays. We offer a one-stop shop for stocking the workplace pantry, filling up on snacks and supplies, and ordering catering and beverages for meetings and gatherings. And with our dedicated corporate concierge team, we're always here to help you delight your team.</p>
      <div className='about-highlight'>
        <div>
            <img src={transport} alt="Lorry image" />
            <h1>Save With Fresh Deals</h1>
            <p>Look for new Fresh Deals every Thursday to save on our favorite peak-season picks and recommendations. Not many grocers put their best food on sale, but we do. Because when something is great, we want everyone to try it. </p>
        </div>
        <div>
          <img src={money} alt="money image" />
          <h1>Try DeliveryPass For Free</h1>
          <p>A DeliveryPass subscription gives you unlimited free grocery delivery, plus the ability to reserve a timeslot. Start with a free trial and you'll get 60 days of free delivery. After that, the cost pays for itself if you order more than once a month.</p>

        </div>
      </div>
    </div>
  )
}

export default About