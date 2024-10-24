import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Link } from "react-router-dom";

export const BadRequest = () => {
  return (
    <div className="mx-auto w-full md:w-[500px] my-20">
      <h2 className="text-5xl text-center text-secondAccent">Bad Request</h2>
      <DotLottieReact src="/bad_request.json" loop autoplay />
      <Link to="/articles" className="mt-6 block w-[300px] button text-center ">
        Try again
      </Link>
    </div>
  );
};
