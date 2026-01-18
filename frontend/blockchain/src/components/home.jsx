import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Banner from "./banner";
import MetaMask from "./MetaMask";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let sections = gsap.utils.toArray(".panel");

    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: () => "+=" + containerRef.current.offsetWidth
      }
    });

    // 👇 Each panel ka content right se animate hoga
    sections.forEach((panel) => {
      gsap.from(panel.querySelector(".content"), {
        x: 200, // right side se aaye
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: panel,
          start: "left center",
          toggleActions: "play none none reverse"
        }
      });
    });
  }, []);

  return (
    <div ref={containerRef} className="flex w-[200%] h-screen overflow-hidden">
      {/* Banner Panel */}
      <div className="panel w-screen h-screen flex items-center justify-center bg-black text-white">
        <div className="content">
          <Banner />
        </div>
      </div>

      {/* MetaMask Panel */}
      <div className="panel w-screen h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="content">
          <MetaMask />
        </div>
      </div>
    </div>
  );
};

export default Home;
