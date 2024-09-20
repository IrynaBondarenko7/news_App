import { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { FaArrowCircleUp } from "react-icons/fa";

export const BtnScrollTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ScrollLink
      to="main"
      smooth={true}
      href="/articles"
      spy={true}
      duration={500}
      className={`fixed bottom-14 right-2 md:right-20 z-10 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      id="scrollToTopBtn"
      offset={-100}
    >
      <FaArrowCircleUp size={36} fill="#201E43" />
    </ScrollLink>
  );
};
