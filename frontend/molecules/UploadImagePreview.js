import Image from 'next/image';
import PropTypes from 'prop-types';
const UploadImagePreview = ({
    imgSrc,
    imgWidth,
    imgHeight,
    imgAlt,

}) => {
    const myLoader = ({ src }) => src;
    return (
        <div className='relative w-fit'>
            <Image
                loader={myLoader}
                className='rounded'
                src={imgSrc}
                width={imgWidth}
                height={imgHeight}
                alt={imgAlt} />
            <div className='absolute -right-2.5 -top-2.5 cursor-pointer'>
                <Image src="/images/icons/close-icon-red.svg" width="22" height="22" alt="close" />
            </div>
        </div>
    )
}

UploadImagePreview.propTypes = {
    imgSrc: PropTypes.string,
    imgWidth: PropTypes.string,
    imgHeight: PropTypes.string,
}

export default UploadImagePreview;