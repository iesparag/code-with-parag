'use client';

import { motion, type SVGMotionProps } from 'framer-motion';

interface HamburgerMenuProps {
  isOpen: boolean;
  toggle: () => void;
}

const Path = (props: SVGMotionProps<SVGPathElement>) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="currentColor"
    strokeLinecap="round"
    {...props}
  />
);

export default function HamburgerMenu({ toggle, isOpen }: HamburgerMenuProps) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        toggle();
      }}
      className="relative z-50 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
    >
      <svg width="23" height="23" viewBox="0 0 23 23">
        <Path
          initial={false}
          animate={isOpen ? { d: "M 3 16.5 L 17 2.5" } : { d: "M 2 2.5 L 20 2.5" }}
        />
        <Path
          initial={false}
          d="M 2 9.423 L 20 9.423"
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.1 }}
        />
        <Path
          initial={false}
          animate={isOpen ? { d: "M 3 2.5 L 17 16.346" } : { d: "M 2 16.346 L 20 16.346" }}
        />
      </svg>
    </button>
  );
}
