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
        scrollToTopBtn.classList.add("show");
      } else {
        scrollToTopBtn.classList.remove("show");
      }
    };

    scrollToTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
  return (
    <ScrollLink
      to="main"
      smooth={true}
      href="/articles"
      spy={true}
      duration={500}
      className="fixed bottom-14 right-6 z-10 scroll-to-top "
      id="scrollToTopBtn"
    >
      <FaArrowCircleUp size={36} fill="#201E43" />
    </ScrollLink>
  );
};
