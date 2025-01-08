import Image from "next/image";
import Button from "atoms/zenovo-sass/Button";
import Heading from "atoms/Heading";
import PropTypes from "prop-types";
import { MdOutlineClose } from "react-icons/md";

const RequestAccess = ({ 
    title = "You don't have permission to view this page",
    subtitle = "Please request the admin to grant permission to this page",
    className = '', 
    onCtaClick = () => false, 
    onClose = () => false 
}) => (
  <div
    className={`bg-neutral-1 font-inter relative w-full h-screen flex items-center justify-center ${className}`}
  >
    <div className="absolute top-8 right-8 cursor-pointer">
      <button className=" bg-neutral-3 p-3 rounded-full" onClick={onClose}>
        <MdOutlineClose className={`text-2xl`} />
      </button>
    </div>
    <div className="text-center max-w-lg py-4 lg:py-12 px-2">
      <Image
        src={"/images/hero-request-access.png"}
        width={303}
        height={214}
        alt="request access"
      />
      <Heading className="font-semibold mt-6 text-[24px]" type="h1">
        {title}
      </Heading>
      <p className="text-[14px] mt-2">
        {subtitle}
      </p>
      <Button
        className="activeBtn mt-6 mx-auto"
        primary={false}
        label="Request Access"
        onClick={onCtaClick}
      />
    </div>
  </div>
);

export default RequestAccess;

RequestAccess.propTypes = {
  className: PropTypes.string,
  onCtaClick: PropTypes.func,
  onClose: PropTypes.func,
  title: PropTypes.string,
  subtitle: PropTypes.string,
};
