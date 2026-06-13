import {
  Globe,
  Share2,
  Mail,
  Smartphone,
} from "lucide-react";

import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand Section */}
        <div className="footer-brand">
          <div className="logo-wrapper">
            <div className="logo-circle">
              <img
                src="/logo.avif"
                alt="BoundaryLine Logo"
              />
            </div>

            <h2>BoundaryLine</h2>
          </div>

          <p>
            The world's most advanced cricket analytics
            platform. Serving over 10 million fans globally
            with real-time data.
          </p>

          <div className="social-icons">
            <Globe size={20} />
            <Share2 size={20} />
            <Mail size={20} />
          </div>
        </div>

        {/* Navigation */}
        <div className="footer-column">
          <h3>Navigation</h3>

          <ul>
            <li>Live Scores</li>
            <li>Schedule</li>
            <li>Rankings</li>
            <li>Series</li>
          </ul>
        </div>

        {/* Resources */}
        <div className="footer-column">
          <h3>Resources</h3>

          <ul>
            <li>Stats Hub</li>
            <li>API for Developers</li>
            <li>Newsroom</li>
            <li>Contact Us</li>
          </ul>
        </div>

        {/* App Download */}
        <div className="footer-app">
          <h3>Get the App</h3>

          <div className="store-card">
            <Smartphone size={28} />

            <div>
              <small>DOWNLOAD ON THE</small>
              <h6>App Store</h6>
            </div>
          </div>

          <div className="store-card google">
            <div className="play-text">
              PLAY STORE
            </div>

            <div className="google-text">
              <small>GET IT ON</small>
              <h6>Google Play</h6>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <p>
          © 2026 BoundaryLine Analytics.
          All rights reserved.
        </p>

        <div className="footer-links">
          <a href="/">Privacy</a>
          <a href="/">Terms</a>
          <a href="/">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;