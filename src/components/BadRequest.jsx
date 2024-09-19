import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Link } from "react-router-dom";

export const BadRequest = () => {
  return (
    <div className="mx-auto w-full md:w-[500px] my-20">
      <h2 className="text-5xl text-center">Bad Request</h2>
      <DotLottieReact src="../../public/bad_request.json" loop autoplay />
      <Link
        to="/articles"
        className="mt-6 block py-3 px-4 bg-sky-700 text-white rounded-lg w-[200px] text-center mx-auto"
      >
        Try again
      </Link>
    </div>
  );
};
