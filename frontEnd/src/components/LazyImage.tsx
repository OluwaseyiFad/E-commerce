import { useState, useEffect, useRef } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderSrc?: string;
}

/**
 * LazyImage Component - Lazy loads images using Intersection Observer
 *
 * Features:
 * - Only loads images when they're about to enter the viewport
 * - Shows placeholder until image is loaded
 * - Reduces initial page load time
 * - Improves performance on pages with many images
 * - Uses native loading="lazy" as fallback
 */
const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = "",
  placeholderSrc = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23f3f4f6' width='400' height='300'/%3E%3C/svg%3E",
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Check if IntersectionObserver is supported
    if (!("IntersectionObserver" in window)) {
      // Fallback: load image immediately if IntersectionObserver not supported
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        // Start loading when image is 100px away from viewport
        rootMargin: "100px",
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <img
      ref={imgRef}
      src={isInView ? src : placeholderSrc}
      alt={alt}
      className={`transition-opacity duration-300 ${
        isLoaded ? "opacity-100" : "opacity-0"
      } ${className}`}
      onLoad={handleImageLoad}
      loading="lazy"
    />
  );
};

export default LazyImage;