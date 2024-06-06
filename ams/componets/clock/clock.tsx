"use client"
import React, { useEffect, useRef, useState } from "react";
import "./style.css";

const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [highlightOne, setHighlightOne] = useState(false);

  const secHandRef = useRef<HTMLDivElement>(null);
  const oneRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(now);
      setHighlightOne(now.getSeconds() === 0);

      if (now.getSeconds() === 0) {
        setTimeout(() => {
          setHighlightOne(false);
        }, 5000);
      }
    };

    const timerId = setInterval(updateClock, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    const secHand = secHandRef.current;
    const one = oneRef.current;

    if (secHand && one) {
      const addHighlight = () => {
        one.classList.add("highlight");
      };
      

      secHand.addEventListener("animationiteration", addHighlight);

      const timeoutId = setTimeout(() => {
        one.classList.remove("highlight");
      }, 5000);

      return () => {
        secHand.removeEventListener("animationiteration", addHighlight);
        clearTimeout(timeoutId);
      };
    }
  }, [time]);

  return (
    <div className="clock">
      <div
        ref={secHandRef}
        className="sec_hand"
        style={{ transform: `rotateZ(${time.getSeconds() * 6}deg)` }}
      />
      <div
        className="hour_hand"
        style={{ transform: `rotateZ(${time.getHours() * 30}deg)` }}
      />
      <div
        className="min_hand"
        style={{ transform: `rotateZ(${time.getMinutes() * 6}deg)` }}
      />
      <span className="twelve">12</span>
      <span className="one">1</span>
      <span ref={oneRef} className={`two ${highlightOne ? "highlight" : ""}`}>2</span>
      <span className="three">3</span>
      <span className="four">4</span>
      <span className="five">5</span>
      <span className="six">6</span>
      <span className="seven">7</span>
      <span className="eight">8</span>
      <span className="nine">9</span>
      <span className="ten">10</span>
      <span className="eleven">11</span>
    </div>
  );
};

export default Clock;
