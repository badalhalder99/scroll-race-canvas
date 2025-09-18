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
      {/* Spacer before races */}
      <div className="h-[50vh] bg-space-light"></div>
      
      {/* Horizontal scroll section */}
      <div ref={wrapperRef} className="overflow-hidden">
        <div 
          ref={racesRef}
          className="flex whitespace-nowrap w-fit"
        >
          {races.map((race, index) => (
            <h2 
              key={race}
              className={`
                font-racing text-[30vw] flex-shrink-0 px-[0.3em] m-0 leading-none
                ${index === races.length - 1 
                  ? 'bg-accent text-race-text-special' 
                  : 'text-race-text'
                }
              `}
            >
              {race}
            </h2>
          ))}
        </div>
      </div>
      
      {/* Spacer after races */}
      <div className="h-[100vh] bg-space-light"></div>
    </>
  );
};

export default HorizontalScrollRaces;