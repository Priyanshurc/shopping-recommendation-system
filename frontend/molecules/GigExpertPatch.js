import Text from "../atoms/Text";
import Image from "next/image";

const GigExpertPatch = () => (
    <div className="flex items-end w-full h-[calc(100svh-460px)]">
        <div className="p-3 w-full gig-gradient rounded-sm flex justify-end relative">
            <div className="-bottom-14 -left-1 w-[147px] h-[147px] bg-white bg-opacity-[0.32] rounded-full flex justify-center items-center absolute">
                <div className="w-[117px] h-[117px] bg-white bg-opacity-[0.4] rounded-full "></div>
            </div>
            <div className="w-[100px] h-[126px] absolute bottom-0 left-6 ">
                <Image src={"/images/gig.svg"} layout="fill" objectFit="cover" alt="gig-expert" />
            </div>
            <div className="w-1/2">
                <Text variant="caption" className="text-neutral-900 mb-1" fontWeight="font-semibold">
                    Know more about your service
                </Text>
                <ul className="list-disc list-outside flex flex-col gap-y-1.5 text-[10px] text-neutral-900">
                    <li>Your at-home car service will take less than 2 hours</li>
                    <li>Expert will be assigned 6 hours before the service</li>
                </ul>
            </div>
        </div>
    </div>
);

export default GigExpertPatch;
