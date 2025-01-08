import { Error, Tick2 } from 'assets/Icons';
import Image from 'next/image';
import { forwardRef, useImperativeHandle } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Msg = ({
    closeToast, toastProps, message, image
}) => {
    const Icon = image === "Tick.svg" ? Tick2 : Error;
    return (
        <div className='flex items-center space-x-3'>
            <div className='w-6 h-6 items-center justify-center flex-shrink-0'>
                <Icon size={24} />
            </div>
            <div>
                {message}
            </div>
        </div>
    );
}

const Notification = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        displayToast(
            type = 'info',
            message = ['This is a toast'],
            hideProgressBar,
            image,
            icon = false,
            position = 'top-center',
            autoClose = '3000',
            closeOnClick = true,
        ) {
            toast[type](<Msg message={message} hideProgressBar image={image} />, {
                position,
                autoClose,
                icon
            });
        }
    }));
    return (
        <>
            <ToastContainer icon={false} />
        </>
    );
});

export default Notification;
