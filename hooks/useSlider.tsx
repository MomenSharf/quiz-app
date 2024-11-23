"use client";
import { useState, useEffect, useRef } from "react";

const TRANSLATE_AMOUNT = 300;

export function useSlider() {
  const [translate, setTranslate] = useState(0);
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(true);
  const sliderRef = useRef<HTMLDivElement | null>(null); // sliderRef is allowed to be null

  useEffect(() => {
    const sliderElement = sliderRef.current; // Capture the current value of the ref

    if (sliderElement == null) return; // Handle null reference early

    const fun = () => {
      const scrollLeft = sliderElement.scrollLeft;
      const scrollWidth = sliderElement.scrollWidth;
      const clientWidth = sliderElement.clientWidth;

      if (
        scrollLeft === undefined ||
        scrollWidth === undefined ||
        clientWidth === undefined
      )
        return;

      const isAtRight = scrollWidth - clientWidth < scrollLeft + 10;

      setIsLeftVisible(scrollLeft > 10);
      setIsRightVisible(!isAtRight);
    };

    fun();

    sliderElement.addEventListener("scroll", fun);

    return () => {
      sliderElement.removeEventListener("scroll", fun); // Use the captured variable
    };
  }, []); // The dependency array remains empty because we're only reacting to ref initialization

  const goLeft = () => {
    sliderRef.current?.scrollBy({
      left: -150, // Scroll 100px to the left
      behavior: "smooth", // Smooth scrolling
    });
  };

  const goRight = () => {
    sliderRef.current?.scrollBy({
      left: 150, // Scroll 100px to the right
      behavior: "smooth", // Smooth scrolling
    });
  };

  return {
    translate,
    isLeftVisible,
    isRightVisible,
    sliderRef,
    goLeft,
    goRight,
  };
}
