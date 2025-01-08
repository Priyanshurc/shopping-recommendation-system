import Image from 'next/image';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import IcomoonIcon from '../atoms/IcomoonIcon';
import Icon from '../atoms/Icon';
import Text from '../atoms/Text';
import ViewImage from '../components/PdfDownload/viewImage';
import { uploadImageToS3Bucket } from '../services/aws-uploader.service';
import { useRouter } from 'next/router';

const FileUpload = ({
    isError = false,
    variant = 'default',
    UploadLabel,
    UploadSubText,
    iconSrc,
    iconAlt = '',
    UploadLabelStyle,
    UploadSubTextStyle,
    className,
    getFileName,
    setUploadedFileName,
    fileAccept,
    removeFile,
    fileSize = 3,
    data
}) => {
    const router = useRouter();
    const [file, setFile] = useState([]);
    const [isRemove, setIsRemove] = useState(false);
    const [uploadedFileType, setUploadedFileType] = useState('');
    const { domain } = router.query;

    useEffect(() => {
        if (data?.length > 0 && !isRemove) {
            setFile(data);
        }
    }, [file, data]);

    const uploadSingleFile = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const fileElement = e.target.files[0];
            setUploadedFileName(e.target.files[0].name);
            setUploadedFileType(e.target.files[0].name?.split('.')?.pop()?.toLowerCase());
            try {
                const fileName = fileElement.name;
                const filePath = `${fileName}`;
                const { url } = await uploadImageToS3Bucket(filePath, fileElement,{domain});
                console.log('this is file name',fileName)
                
                if (url) {
                    getFileName(fileName);
                    setFile([...file, process.env.NEXT_PUBLIC_S3_URL + url]);
                }
            } catch (error) {
                return error;
            }
        }
    };
    console.log('this is file',file)
    const uploadMultiFile = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const fileElement = e.target.files[0];
            try {
                const fileName = fileElement.name;
                const filePath = `${fileName}`;
                const { url } = await uploadImageToS3Bucket(filePath, fileElement,{domain});
                if (url) {
                    getFileName(fileName);
                    setFile([...file, url]);
                }
            } catch (error) {
                return error;
            }
        }
    };

    const fileType = {
        default: 'default',
        uploadDrag: 'uploadDrag',
        uploadButton: 'uploadButton',
        singleUpload: 'singleUpload',
        multiUpload: 'multiUpload'
    };

    const deleteFile = (e) => {
        setIsRemove(true);
        if (fileType[variant] === 'singleUpload') {
            removeFile();
            setFile([]);
        } else {
            const s = file.filter((item, index) => index !== e);
            removeFile(s);
            setFile(s);
        }
    };
    return (
        <div className="flex flex-wrap " variant={fileType[variant]}>
            {fileType[variant] == 'singleUpload' && (
                <>
                    {file.length > 0 && (
                        <div className="relative group w-[104px] h-[104px] overflow-hidden  border border-neutral-300 mx-2 p-2 rounded-sm text-center" key={file[0]}>
                            <div className="relative">
                                <Image className="m-auto object-cover object-center w-[86px] h-[86px]" src={encodeURI(file[0])} width="86" height="86" alt="file" />
                                <div className="absolute top-0 left-0 w-full h-full justify-center bg-neutral-500 hidden group-hover:flex" onClick={() => deleteFile(0)}>
                                    <Image className="cursor-pointer" src="/images/icons/delete-w.svg" width="14" height="14" alt="delete" />
                                </div>
                            </div>
                        </div>
                    )}
                    {file.length < 1 && (
                        <div
                            className={`relative w-[104px] h-[104px] flex flex-col justify-center bg-neutral-100 border text-center ${isError ? 'border-error-100' : 'border-neutral-300'
                                }`}
                        >
                            <input
                                type="file"
                                // disabled={file.length === 1}
                                className="absolute w-full h-full left-0 top-0 opacity-0 cursor-pointer z-10"
                                onChange={uploadSingleFile}
                                accept={fileAccept}
                            />
                            <div className="p-2 text-center">
                                {iconSrc && <IcomoonIcon icon={iconSrc} size={'14'} color={'#373751'} className="mx-auto" />}
                                <Text className="text-base text-neutral-700 mt-2.5 font-medium">{UploadLabel}</Text>
                                <Text className="text-sm text-neutral-500 mt-1 ">{UploadSubText}</Text>
                            </div>
                        </div>
                    )}
                </>
            )}
            {fileType[variant] == 'default' && (
                <>
                    {file.length > 0
                        && file.map((item, index) => (
                            <div className="relative group w-[104px] h-[104px] overflow-hidden  border border-neutral-300 mx-2 p-2 rounded-sm text-center" key={item}>
                                <div className="relative">
                                    <Image className="m-auto object-cover object-center w-[86px] h-[86px]" src={uploadedFileType === 'pdf' ? '/images/icons/pdf.svg' : encodeURI(item)} width="86" height="86" alt="file" />
                                    <div
                                        className="absolute top-0 left-0 w-full h-full justify-center bg-neutral-500 hidden group-hover:flex"
                                        onClick={() => deleteFile(index)}
                                    >
                                        <Image className="cursor-pointer" src="/images/icons/delete-w.svg" width="14" height="14" alt="delete" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    {file.length < fileSize && (
                        <div
                            className={`relative w-[104px] h-[104px] flex flex-col justify-center bg-neutral-100 border text-center ${isError ? 'border-error-100' : 'border-neutral-300'
                                }`}
                        >
                            <input
                                type="file"
                                // disabled={file.length === 5}
                                className="absolute w-full h-full left-0 top-0 opacity-0 cursor-pointer z-10"
                                onChange={uploadSingleFile}
                                accept={fileAccept}
                            />
                            <div className="p-2 text-center">
                                {iconSrc && <IcomoonIcon icon={iconSrc} size={'14'} color={'#373751'} className="mx-auto" />}
                                <Text className="text-base text-neutral-700 mt-2.5 font-medium">{UploadLabel}</Text>
                                <Text className="text-sm text-neutral-500 mt-1 ">{UploadSubText}</Text>
                            </div>
                        </div>
                    )}
                </>
            )}
            {fileType[variant] == 'multiUpload' && (
                <>
                    {file.length > 0
                        && file.map((item, index) => (
                            <div className="relative group w-[104px] h-[104px] overflow-hidden mb-2 border border-neutral-300 mx-2 p-2 rounded-sm text-center" key={item}>
                                <div className="relative">
                                    <ViewImage
                                        defaultCss="m-auto object-cover object-center w-[70px] h-[70px]"
                                        width={'100%'}
                                        height={'100%'}
                                        imageKey={item}
                                        isClick={false}
                                    />
                                    <div
                                        className="absolute top-0 left-0 w-full h-full justify-center bg-neutral-500 hidden group-hover:flex"
                                        onClick={() => deleteFile(index)}
                                    >
                                        <Image className="cursor-pointer" src="/images/icons/delete-w.svg" width="14" height="14" alt="delete" />
                                    </div>
                                </div>
                            </div>
                        ))}

                    <div
                        className={`relative w-[104px] h-[104px] flex flex-col justify-center bg-neutral-100 border text-center ${isError ? 'border-error-100' : 'border-neutral-300'
                            }`}
                    >
                        <input
                            type="file"
                            // disabled={file.length === 5}
                            className="absolute w-full h-full left-0 top-0 opacity-0 cursor-pointer"
                            onChange={uploadMultiFile}
                            accept={fileAccept}
                        />
                        <div className="p-2 text-center">
                            {iconSrc && <IcomoonIcon icon={iconSrc} size={'14'} color={'#373751'} className="mx-auto" />}
                            <Text className="text-base text-neutral-700 mt-2.5 font-medium">{UploadLabel}</Text>
                            <Text className="text-sm text-neutral-500 mt-1 ">{UploadSubText}</Text>
                        </div>
                    </div>
                </>
            )}
            {fileType[variant] == 'uploadDrag' && (
                <div className={` ${className}`}>
                    <div className={`relative w-[395px] h-[168px] flex flex-col justify-center text-center ${isError ? 'border-error-100' : 'border-neutral-300'}`}>
                        <input
                            type="file"
                            // disabled={file.length === 5}
                            className="absolute w-full h-full left-0 top-0 opacity-0 cursor-pointer z-10"
                            onChange={uploadSingleFile}
                        />
                        <div className="p-2 text-center">
                            {iconSrc && <Icon iconSrc={iconSrc} iconAlt={iconAlt} className="mx-auto w-9" />}
                            <Text className={`text-base text-neutral-700 mt-2.5 font-medium ${UploadLabelStyle}`}>{UploadLabel}</Text>
                            <Text className={`text-sm text-neutral-500 mt-1 ${UploadSubTextStyle}`}>{UploadSubText}</Text>
                        </div>
                    </div>
                    {file.length > 0
                        && file.map((item, index) => (
                            <div className="relative group w-[395px]   overflow-hidden mt-1  rounded-sm text-center" key={item}>
                                <div className="relative">
                                    <div className="flex gap-2 py-1">
                                        <Icon iconSrc="/images/icons/attachment.svg" iconAlt="attachnent" className="" />
                                        <Text className="text-primary-900 text-sm">abc.png</Text>
                                    </div>
                                    <div
                                        className="absolute top-0 left-0 w-full h-full justify-center bg-neutral-500 hidden group-hover:flex"
                                        onClick={() => deleteFile(index)}
                                    >
                                        <Image className="cursor-pointer" src="/images/icons/delete-w.svg" width="14" height="14" alt="delete" />
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            )}
            {fileType[variant] == 'uploadButton' && (
                <div className={`${className} `}>
                    <div className={`relative ${className} h-[108px] py-2 flex flex-col justify-center text-center ${isError ? 'border-error-100' : 'border-neutral-300'}`}>
                        <input
                            type="file"
                            // disabled={file.length === 5}
                            className="absolute w-full h-full left-0 top-0 opacity-0 cursor-pointer z-10"
                            onChange={uploadSingleFile}
                        />
                        <div className="flex gap-2 px-2 py-2 text-center">
                            {iconSrc && <Icon iconSrc={iconSrc} iconAlt={iconAlt} className="w-4" />}
                            <Text className={`text-sm self-center text-neutral-700 mt-1 font-normal ${UploadLabelStyle}`}>{UploadLabel}</Text>
                        </div>
                    </div>
                    {file.length > 0
                        && file.map((item, index) => (
                            <div className="relative group w-[395px]   overflow-hidden mt-1  rounded-sm text-center" key={item}>
                                <div className="flex justify-between">
                                    <div className="flex gap-2 py-1">
                                        <Icon iconSrc="/images/icons/attachment.svg" iconAlt="attachnent" className="" />
                                        <Text className="text-primary-900 text-sm">abc.png</Text>
                                    </div>

                                    <Image className="cursor-pointer" src="/images/icons/delete-icon.svg" width="35" height="35" alt="delete" />
                                </div>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

FileUpload.propTypes = {
    isError: PropTypes.bool
};

export default FileUpload;
