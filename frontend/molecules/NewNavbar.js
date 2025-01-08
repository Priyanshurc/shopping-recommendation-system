import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Button from '../atoms/Button';
import { getAuth, isAuthenticated } from '../services/identity.service';
import IcomoonIcon from '../atoms/IcomoonIcon';
import Text from '../atoms/Text';
import { Logo } from 'assets/Icons';
import { LuBell } from "react-icons/lu";

const NewNavbar = ({
    location, handleLogin, handleLogout, ...property
}) => {
    const [isAuth, setIsAuth] = useState(false);
    useEffect(() => {
        const auth = getAuth();
        if (auth) {
            setIsAuth(isAuthenticated(auth));
        } else {
            setIsAuth(false);
        }
    }, [handleLogin, handleLogout]);

    return (
        <div className={`w-full bg-white shadow border-b border-[#CDCDCD] fixed left-0 top-0 z-50 ${property.className}`}>
            <div
                className={
                    'px-2 py-3  flex items-center w-full justify-between  lg:mx-auto  lg:px-6'
                }
            >
                <Link href={'#'} passHref>
                    <div className="relative cursor-pointer  flex-shrink-0">
                        <Logo />
                    </div>
                </Link>
                {/* <Link href={'/'} passHref>
                    <div className="mt-5 lg:w-[8.5rem] lg:h-[2.875rem] relative cursor-pointer hidden flex-shrink-0 lg:block">
                        <Logo />
                    </div>
                </Link> */}
                <div class="flex flex-row ml-3">
                    <div className="pt-3 px-5">
                        <LuBell size={26}/>
                    </div>
                    <div className="pt-1">
                        <button type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                        <span className="absolute -inset-1.5"></span>
                        <span className="sr-only">Open user menu</span>
                        <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                        </button>
                    </div>
                </div>
                

            </div>
        </div>
    );
};

export default NewNavbar;

NewNavbar.propTypes = {
    className: PropTypes.string,
    location: PropTypes.string
};
