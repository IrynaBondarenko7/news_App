import { Link as ScrollLink } from "react-scroll";
import { FaArrowCircleUp } from "react-icons/fa";

export const BtnScrollTop = () => {
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");

  if (scrollToTopBtn) {
    window.onscroll = function () {
      if (
        document.body.scrollTop > 300 ||
        document.documentElement.scrollTop > 300
      ) {
        scrollToTopBtn.style.display = "block";
      } else {
        scrollToTopBtn.style.display = "none";
      }
    };
  }
  return (
    <ScrollLink
      to="main"
      smooth={true}
      href="/articles"
      spy={true}
      duration={500}
      className="fixed bottom-14 right-2 md:right-20 z-10"
      id="scrollToTopBtn"
      offset={-100}
    >
      <FaArrowCircleUp size={36} fill="#201E43" />
    </ScrollLink>
  );
};
