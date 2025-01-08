import Button from "../atoms/Button";
import Text from "../atoms/Text";
import { getDiscount } from "../helpers/utilities";

const CouponCard = ({ coupon, handleApplyCouponCard, ...property }) => (
    <div className={`bg-white flex shadow border border-l-0 items-stretch h-full border-neutral-300 rounded-xl overflow-hidden ${property.className}`}>
        <div className="bg-secondary-900 flex overflow-hidden relative justify-center items-center flex-shrink-0 max-w-[40px] h-44">
            <div className="flex flex-col gap-y-1 absolute -left-3.5">
                <span className="bg-white w-5 h-5 rounded-full"></span>
                <span className="bg-white w-5 h-5 rounded-full"></span>
                <span className="bg-white w-5 h-5 rounded-full"></span>
                <span className="bg-white w-5 h-5 rounded-full"></span>
            </div>
            <Text variant="bodySmall" className="text-white -rotate-90 whitespace-nowrap w-fit h-fit" fontWeight="font-bold">
                FLAT {getDiscount(coupon.discountValue, coupon.discountType)} OFF*
            </Text>
        </div>
        <div className="py-4 pl-2 pr-4 w-full">
            <div className="flex justify-between items-center w-full">
                <Text variant="body" className="uppercase text-neutral-900 " fontWeight="font-bold">
                    {coupon.couponName}
                </Text>
                <Button
                    style="borderLess"
                    label="apply"
                    className="uppercase font-bold tracking-widest flex-shrink-0 !px-0"
                    size="small"
                    onClick={() => handleApplyCouponCard(coupon)}
                />
            </div>
            <Text variant="bodySmall" className="text-success-100" fontWeight="font-semibold">
                Save {getDiscount(coupon.discountValue, coupon.discountType)} on this service
            </Text>

            <Text variant="bodySmall" className="text-neutral-500 pt-2 mt-3 border-t border-neutral-300">
                Use code {coupon.couponName} & get flat {getDiscount(coupon.discountValue, coupon.discountType)} off
            </Text>
        </div>
    </div>
);

export default CouponCard;
