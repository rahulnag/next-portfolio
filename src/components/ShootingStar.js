"use client";
import { useEffect, useState } from "react";
import styles from "./ShootingStar.module.css";

// Module scope resets on every full page load (reload / new visit), but survives in-app
// navigation — so the star plays once per load, not every time you click back to Home.
let playedThisLoad = false;

// One bright shooting star across the landing page background.
const ShootingStar = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (playedThisLoad) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    playedThisLoad = true;
    setShow(true);
  }, []);

  if (!show) return null;

  return (
    <div className={styles.sky} aria-hidden="true">
      <div className={styles.path}>
        <span className={styles.star} onAnimationEnd={() => setShow(false)} />
      </div>
    </div>
  );
};

export default ShootingStar;
