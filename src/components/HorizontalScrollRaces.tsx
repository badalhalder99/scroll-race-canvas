import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const races = [
  { name: 'Monaco', image: 'https://picsum.photos/800/600?random=1' },
  { name: 'Austria', image: 'https://picsum.photos/800/600?random=2' },
  { name: 'Hungary', image: 'https://picsum.photos/800/600?random=3' },
  { name: 'Netherlands', image: 'https://picsum.photos/800/600?random=4' },
  { name: 'Japan', image: 'https://picsum.photos/800/600?random=5' }
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
          {races.map((race, index) => (
            <div key={race.name} className={`race-item ${index === races.length - 1 ? 'last-race' : ''}`}>
              <img src={race.image} alt={race.name} />
            </div>
          ))}
        </div>
      </div>
      
      <div className="space-100vh lightBG"></div>
    </>
  );
};

export default HorizontalScrollRaces;