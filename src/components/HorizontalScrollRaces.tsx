import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const races = [
  'Monaco',
  'Austria', 
  'Hungary',
  'Netherlands',
  'Japan'
];

const HorizontalScrollRaces = () => {
  const racesRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const racesElement = racesRef.current;
    const wrapperElement = wrapperRef.current;

    if (!racesElement || !wrapperElement) return;

    const getScrollAmount = () => {
      const racesWidth = racesElement.scrollWidth;
      return -(racesWidth - window.innerWidth);
    };

    const tween = gsap.to(racesElement, {
      x: getScrollAmount,
      duration: 3,
      ease: "none",
    });

    const scrollTrigger = ScrollTrigger.create({
      trigger: wrapperElement,
      start: "top 20%",
      end: () => `+=${getScrollAmount() * -1}`,
      pin: true,
      animation: tween,
      scrub: 1,
      invalidateOnRefresh: true,
    });

    return () => {
      scrollTrigger.kill();
    };
  }, []);

  return (
    <>
      <div className="space-50vh lightBG"></div>
      
      <div ref={wrapperRef} className="racesWrapper">
        <div ref={racesRef} className="races">
          {races.map((race) => (
            <h2 key={race}>{race}</h2>
          ))}
        </div>
      </div>
      
      <div className="space-100vh lightBG"></div>
    </>
  );
};

export default HorizontalScrollRaces;