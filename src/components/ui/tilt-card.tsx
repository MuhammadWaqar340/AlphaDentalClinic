"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

import { cn } from "@/lib/utils";

export type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees (about 5–8 for premium feel). */
  intensity?: number;
  perspective?: number;
  glare?: boolean;
  disabled?: boolean;
};

const spring = { stiffness: 220, damping: 24, mass: 0.55 };

/**
 * Premium 3D tilt surface for marketing cards.
 * Pointer tracking updates Motion values only (no React re-render per move).
 * Disabled on touch/coarse pointers and when prefers-reduced-motion is set.
 */
export function TiltCard({
  children,
  className,
  intensity = 6,
  perspective = 960,
  glare = true,
  disabled = false,
}: TiltCardProps) {
  const reduceMotion = useReducedMotion();
  const [finePointer, setFinePointer] = useState(false);
  const [hovered, setHovered] = useState(false);
  const frameRef = useRef<number | null>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setFinePointer(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const enabled = !disabled && !reduceMotion && finePointer;

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);

  const rotateX = useTransform(sy, [0, 1], [intensity, -intensity]);
  const rotateY = useTransform(sx, [0, 1], [-intensity, intensity]);
  const glareX = useTransform(sx, (value) => `${value * 100}%`);
  const glareY = useTransform(sy, (value) => `${value * 100}%`);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.55) 0%, rgba(12,166,198,0.12) 28%, transparent 62%)`;

  const reset = useCallback(() => {
    px.set(0.5);
    py.set(0.5);
    setHovered(false);
    rectRef.current = null;
  }, [px, py]);

  const onPointerEnter = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!enabled) return;
      rectRef.current = event.currentTarget.getBoundingClientRect();
      setHovered(true);
    },
    [enabled],
  );

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!enabled) return;

      const nextX = event.clientX;
      const nextY = event.clientY;

      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }

      frameRef.current = requestAnimationFrame(() => {
        const node = rootRef.current;
        if (!node) return;
        const rect = rectRef.current ?? node.getBoundingClientRect();
        rectRef.current = rect;
        const x = Math.min(1, Math.max(0, (nextX - rect.left) / rect.width));
        const y = Math.min(1, Math.max(0, (nextY - rect.top) / rect.height));
        px.set(x);
        py.set(y);
      });
    },
    [enabled, px, py],
  );

  return (
    <div
      ref={rootRef}
      className={cn("h-full [perspective:var(--tilt-perspective)]", className)}
      style={
        {
          "--tilt-perspective": `${perspective}px`,
        } as CSSProperties
      }
      onPointerEnter={onPointerEnter}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
    >
      <motion.div
        className={cn(
          "relative h-full transform-gpu rounded-[inherit]",
          "[transform-style:preserve-3d]",
          enabled && "transition-shadow duration-300",
          enabled &&
            hovered &&
            "shadow-[0_18px_40px_rgba(16,43,80,0.14)] ring-1 ring-[#0CA6C6]/25",
        )}
        style={
          enabled
            ? {
                rotateX,
                rotateY,
                transformPerspective: perspective,
              }
            : undefined
        }
        animate={
          enabled
            ? {
                y: hovered ? -6 : 0,
                scale: hovered ? 1.02 : 1,
              }
            : { y: 0, scale: 1 }
        }
        transition={{ type: "spring", stiffness: 260, damping: 24, mass: 0.5 }}
        whileTap={
          !enabled && !reduceMotion && !disabled
            ? { scale: 0.985, y: 1 }
            : undefined
        }
      >
        <div className="relative h-full [transform-style:preserve-3d]">
          {children}
        </div>

        {glare && enabled ? (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] mix-blend-soft-light"
            style={{ background: glareBackground }}
            animate={{ opacity: hovered ? 0.65 : 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          />
        ) : null}
      </motion.div>
    </div>
  );
}
