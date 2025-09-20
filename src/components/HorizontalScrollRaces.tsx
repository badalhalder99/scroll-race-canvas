import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const images = [
  'https://picsum.photos/800/1200?random=1',
  'https://picsum.photos/800/1200?random=2',
  'https://picsum.photos/800/1200?random=3',
  'https://picsum.photos/800/1200?random=4',
  'https://picsum.photos/800/1200?random=5'
];

const HorizontalScrollRaces = () => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const galleryElement = galleryRef.current;
    const wrapperElement = wrapperRef.current;

    if (!galleryElement || !wrapperElement) return;

    const getScrollAmount = () => {
      const galleryWidth = galleryElement.scrollWidth;
      return -(galleryWidth - window.innerWidth);
    };

    const tween = gsap.to(galleryElement, {
      x: getScrollAmount,
      duration: 3,
      ease: "none",
    });

    const scrollTrigger = ScrollTrigger.create({
      trigger: wrapperElement,
      start: "top top",
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
    <div ref={wrapperRef} className="gallery-wrapper">
      <div className="title-section">
        <h1 className="title">
          Shifting Realities:
          <br />
          A Visual Journey
        </h1>
      </div>
      <div ref={galleryRef} className="gallery">
        {images.map((image, index) => (
          <div key={index} className="gallery-item">
            <img src={image} alt={`Gallery image ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalScrollRaces;