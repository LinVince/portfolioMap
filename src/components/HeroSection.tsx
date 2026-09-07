import { animate, stagger } from "animejs";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

type Thumbnail = {
  src: string;
  label: string;
};

const thumbnails: Thumbnail[] = [
  { src: new URL("../../YT thumbnails/5771509389910019990.jpg", import.meta.url).href, label: "AI in practice" },
  { src: new URL("../../YT thumbnails/6049851767798829093.jpg", import.meta.url).href, label: "Teaching with AI" },
  { src: new URL("../../YT thumbnails/ChatGPT Image Aug 20, 2026 at 05_04_36 PM.png", import.meta.url).href, label: "Generative thinking" },
  { src: new URL("../../YT thumbnails/ChatGPT Image Aug 29, 2026 at 11_38_24 AM.png", import.meta.url).href, label: "Human and machine" },
  { src: new URL("../../YT thumbnails/YT thumbnail.png", import.meta.url).href, label: "Video field notes" },
  { src: new URL("../../YT thumbnails/thumbnail.png", import.meta.url).href, label: "Learning in public" },
];

const HeroSection = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const isInteractingRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const carouselOffset = useMotionValue(0);
  const rotateX = useSpring(pointerY, { stiffness: 180, damping: 24 });
  const rotateY = useSpring(pointerX, { stiffness: 180, damping: 24 });
  const carouselX = useSpring(carouselOffset, { stiffness: 150, damping: 22 });

  useEffect(() => {
    animate(".hero-3d-kicker, .hero-3d-title-line, .hero-3d-copy, .hero-3d-actions", {
      opacity: [0, 1],
      translateY: [28, 0],
      delay: stagger(90),
      duration: 780,
      ease: "out(4)",
    });
  }, []);

  useEffect(() => {
    if (activeIndex < 0) return;
    const stage = stageRef.current;
    const card = cardRefs.current[activeIndex];
    if (!stage || !card) return;

    stage.scrollTo({
      left: card.offsetLeft - (stage.clientWidth - card.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, [activeIndex]);

  useEffect(() => {
    let frame = 0;
    let previousTime = performance.now();

    const flow = (time: number) => {
      const stage = stageRef.current;
      const elapsed = time - previousTime;
      previousTime = time;

      if (stage && !isInteractingRef.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        stage.scrollLeft += Math.min(elapsed * 0.018, 1.2);
        if (stage.scrollLeft >= stage.scrollWidth - stage.clientWidth - 1) {
          stage.scrollLeft = 0;
        }
      }

      frame = requestAnimationFrame(flow);
    };

    frame = requestAnimationFrame(flow);
    return () => cancelAnimationFrame(frame);
  }, []);

  const selectNearestCard = (clientX: number, clientY: number) => {
    let nearestIndex = activeIndex;
    let nearestDistance = Number.POSITIVE_INFINITY;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const bounds = card.getBoundingClientRect();
      const distance = Math.hypot(
        clientX - (bounds.left + bounds.width / 2),
        clientY - (bounds.top + bounds.height / 2),
      );
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    setActiveIndex(nearestIndex);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = stageRef.current?.getBoundingClientRect();
    if (!bounds) return;

    const normalizedX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const normalizedY = (event.clientY - bounds.top) / bounds.height - 0.5;
    pointerY.set(normalizedX * -7);
    pointerX.set(normalizedY * 7);
    carouselOffset.set(normalizedX < -0.16 ? 86 : normalizedX > 0.16 ? -86 : 0);
    selectNearestCard(event.clientX, event.clientY);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
    carouselOffset.set(0);
  };

  return (
    <section className="hero-shell hero-3d-shell" aria-labelledby="hero-title">
      <div className="hero-3d-layout">
        <motion.div
          ref={stageRef}
          className="hero-3d-stage"
          onPointerMove={handlePointerMove}
          onPointerLeave={resetPointer}
          onPointerDown={() => { isInteractingRef.current = true; }}
          onPointerUp={() => { isInteractingRef.current = false; }}
          onFocusCapture={() => { isInteractingRef.current = true; }}
          onBlurCapture={() => { isInteractingRef.current = false; }}
          style={{ rotateX, rotateY, x: carouselX }}
          aria-label="Interactive project thumbnail archive"
        >
          <div className="hero-3d-stage-grid" aria-hidden="true" />
          {thumbnails.map((thumbnail, index) => (
            <button
              className={`hero-3d-card ${activeIndex === index ? "is-active" : ""}`}
              key={thumbnail.src}
              ref={(element) => { cardRefs.current[index] = element; }}
              style={{ "--card-index": index } as React.CSSProperties}
              type="button"
              aria-label={`Show ${thumbnail.label}`}
              aria-pressed={activeIndex === index}
              onFocus={() => setActiveIndex(index)}
              onMouseEnter={() => {
                isInteractingRef.current = true;
                setActiveIndex(index);
              }}
              onMouseLeave={() => { isInteractingRef.current = false; }}
              onClick={() => setActiveIndex(index)}
            >
              <img src={thumbnail.src} alt="" />
              <span>{thumbnail.label}</span>
            </button>
          ))}
        </motion.div>

        <div className="hero-3d-copy-block">
          <div className="hero-3d-copy-grid">
            <div>
              <p className="hero-3d-kicker">Yueh / AI / learning / interaction</p>
              <h1 id="hero-title" className="hero-3d-title" aria-label="AI Technologist and Educator">
                <span className="hero-3d-title-line">AI Technologist</span>
                <span className="hero-3d-title-line hero-3d-title-line--accent">and Educator</span>
              </h1>
              <p className="hero-3d-copy">
                I make complex technology easier to understand, use, and teach.
                Explore the work by moving through the ideas that shaped it.
              </p>
              <div className="hero-3d-actions">
                <RouterLink className="atlas-button atlas-button--accent" to="/portfolioMap">
                  Enter the portfolio map <span aria-hidden="true">↗</span>
                </RouterLink>
                <span className="hero-3d-hint">Move through the archive</span>
              </div>
            </div>

            <div className="hero-3d-sidecar">
              <div className="hero-credentials" aria-label="Professional credentials">
                <p className="hero-credential hero-credential--primary">
                  Certified AI Security Engineer
                </p>
                <p className="hero-credential hero-credential--secondary">
                  <span>7+ Years in Cybersecurity</span>
                  <span>5+ years in tech training and consulting</span>
                </p>
              </div>
              <div className="hero-visual-orbit" aria-hidden="true">
                <motion.span
                  className="hero-orbit-ring hero-orbit-ring--outer"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                />
                <motion.span
                  className="hero-orbit-ring hero-orbit-ring--inner"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
                />
                <motion.span
                  className="hero-orbit-node hero-orbit-node--one"
                  animate={{ y: [0, -10, 0], opacity: [0.45, 1, 0.45] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.span
                  className="hero-orbit-node hero-orbit-node--two"
                  animate={{ y: [0, 12, 0], opacity: [1, 0.45, 1] }}
                  transition={{ duration: 4.1, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.span
                  className="hero-orbit-core"
                  animate={{ scale: [0.86, 1.08, 0.86], opacity: [0.65, 1, 0.65] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
