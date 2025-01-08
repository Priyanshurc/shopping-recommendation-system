import PropTypes from 'prop-types';
import IcomoonIcon from '../atoms/IcomoonIcon';
import InputBox from '../atoms/InputBox';

const SearchWithIcon = ({
    id, name, handleSearchLocation, placeholder, onChange, icon, handleIconOnClick, iconClass, ...property
}) => (
    <div className={`bg-transparent relative w-full ${property.className}`}>
        <InputBox
            type="search"
            variant="Large"
            className="pl-10 shadow-sm  placeholder:text-neutral-500"
            placeholder={placeholder}
            id={id}
            name={name}
            onChange={onChange}
            onClickHandler={handleSearchLocation}
            value={property?.value}
        />
        <div className='w-4 h-4 flex items-center justify-center absolute top-4 left-4 flex-shrink-0'>
            <IcomoonIcon icon={icon || 'search'} onClick={handleIconOnClick} size={'100%'} color={'#4B4B63'} className={`flex-shrink-0 ${iconClass}`} />
        </div>
    </div>
);

export default SearchWithIcon;

SearchWithIcon.propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    handleSearchLocation: PropTypes.func,
    onChange: PropTypes.func
};
