import React, { useState, useEffect } from "react";
import "./Footer.css";

export const Footer = () => {
  const [scrollingDown, setScrollingDown] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setScrollingDown(true); // Scrolling down
      } else {
        setScrollingDown(false); // Scrolling up
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollPage = () => {
    if (scrollingDown) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer>
      <div className="footer-content">
        {/* About This Project Section */}
        <div className="about-project">
          <h3>Project Purpose</h3>
          <p className="sub-heading">
            <span>This React project was built to learn:</span>
            <p className="points green-highlight"><i class="ri-database-2-fill"></i> Fetching API data using async, await, then, and catch</p>
            <p className="points red-highlight"><i class="ri-error-warning-fill"></i> Handling loading and error states in a React app</p>
          </p>
        </div>

        {/* My Name with link */}
        <a href="http://bento.me/KSR" target="_blank" rel="noopener noreferrer">
          <p className="my-name">
            <i className="ri-code-s-slash-fill"></i> Kishore S R
          </p>
        </a>

        {/* Scroll Button */}
        <button className="top-arrow" onClick={scrollPage}>
          {scrollingDown ? "↓" : "↑"}
        </button>
      </div>
    </footer>
  );
};
