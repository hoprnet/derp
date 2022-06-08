import React from 'react'
import styled from '@emotion/styled'




const links = [
  {
    "name": "CONTACT",
    "link": "mailto:contact@hoprnet.org"
  },
  {
    "name": "ABOUT US",
    "link": "/about-us/mission"
  },
  {
    "name": "PARTNERS",
    "link": "/about-us/partners"
  },
  {
    "name": "DISCLAIMER",
    "link": "/disclaimer"
  }
];

const socials = [
  {
    "img": "/assets/icons/social-networks/twitter.svg",
    "link": "https://twitter.com/hoprnet"
  },
  {
    "img": "/assets/icons/social-networks/telegram.svg",
    "link": "https://t.me/hoprnet"
  },
  {
    "img": "/assets/icons/social-networks/linkedin.svg",
    "link": "https://www.linkedin.com/company/hoprnet"
  },
  {
    "img": "/assets/icons/social-networks/github.svg",
    "link": "https://github.com/hoprnet"
  },
  {
    "img": "/assets/icons/social-networks/medium.svg",
    "link": "https://medium.com/hoprnet"
  },
  {
    "img": "/assets/icons/social-networks/youtube.svg",
    "link": "https://www.youtube.com/channel/UC2DzUtC90LXdW7TfT3igasA"
  },
  {
    "img": "/assets/icons/social-networks/discord.svg",
    "link": "https://discord.gg/dEAWC4G"
  }
]

const Footer = () => {
  return (
    <div className="footer background-gradient-blue">
      <div className='substack-section txt-center'>
        <h3>HOPR Newsletter</h3>
        <iframe
          title="substack"
          src="https://hopr.substack.com/embed"
          scrolling="no"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
        />
      </div>
      <footer>
        <div className='left-column'>
          <div className='logo'>
            <img src="/assets/icons/hopr_icon.svg" alt="HOPR Logo" />
          </div>
          <div className='content'>
            <ul>
              <li>
                <address>HOPR<br/>Bleicherweg 33<br/>8002 Zürich<br/>Switzerland</address>
              </li>
              <li>
                <address>"HOPR Tech Pte. Ltd.<br/>68 Circular Road, #02-01,<br/>049422 Singapore<br/>Singapore</address>
              </li>
            </ul>
            <p>©2022 HOPR Association, all rights reserved</p>
          </div>
        </div>
        <div className='right-column'>
          <div className="social-networks">
            {socials?.map((x, i) => (
              <a key={i} href={x.link} target="_blank">
                <img src={x.img} />
              </a>
            ))}
          </div>
          <div className="links">
            {links?.map((x, i) => (
              <a key={i} title={x.name} href={x.link}>{x.name}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
