import React, { useEffect } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";


const LandingPage = () => {

    const videoRef = useRef(null);
    const typingTextRef = useRef(null);
    const intervalRef = useRef(null);

    const handleVideoEnd = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
        }
    }

    useEffect(() => {
        const text = "Wake up, the matrix has you ...";
        const typingSpeed = 100;
        const startingDelay = 1000;
        let index = 0;

        typingTextRef.current.innerHTML = ''
    
        // Define the typing effect
        const typingTimeout = setTimeout(() => {
          intervalRef.current = setInterval(() => {
            typingTextRef.current.style.fontFamily = '"Press Start 2P", system-ui';
            if (index < text.length) {
              typingTextRef.current.innerHTML = text.slice(0, index + 1);
              index++;
            } else {
              typingTextRef.current.innerHTML = text; // Final text without the cursor
              clearInterval(intervalRef.current); // Stop typing when done
            }
          }, typingSpeed);
        }, startingDelay)

        return () => {clearInterval(intervalRef.current);
          clearTimeout(typingTimeout);
        } // Cleanup on unmount
      }, []);

    return <main className="landing-page">
        <video ref={videoRef} autoPlay loop muted preload="auto" className="background-video" onEnded={handleVideoEnd}>
            <source src='../../public/11584395-uhd_3840_2160_60fps.mp4' type="video/mp4" />
      </video>
        <div className="landing-page-content">
            <h1 className="title">EVAL</h1>
            <div className="hero"><span ref={typingTextRef}></span></div>
            <div className="pill-container">
            <Link to={'/register'} className="link">
                <div className="pill" >
                  <img src="../../public/images/red-pill-small.png" id="red" />
                  <p className="coa" id="red-coa">Create your Account</p>
                </div>
              </Link>
              <Link to={'/login'} className="link">
                <div className="pill" >
                  <img src="../../public/images/blue-pill-small2.png" id="blue" />
                  <p className="coa" id="blue-coa">Log in</p>
                </div>
              </Link>
            </div>
        </div>
    </main>
}

export default LandingPage;