import { Clone } from "assets/Icons";
import Button from "atoms/zenovo-sass/Button";
import React, { useState } from "react";
import ConfirmModal from "organisms/Modal";


const CloneButton = ({ onClone, hasRelatedList = true }) => {
    const [showModal, setShowModal] = useState(false);

    const handleClone = async ({ cloneRelatedList = false }) => {
        onClone({ cloneRelatedList, onSuccess: closeModal });
    }

    const toggleModalState = () => {
        setShowModal(!showModal);
    }

    const handleCloneClick = () => {
        if (!hasRelatedList) {
            handleClone({ cloneRelatedList: false });
        } else {
            toggleModalState();
        }
    }

    const closeModal = () => {
        setShowModal(false);
    }

    return (
        <div>
            <Button
                type="reset"
                primary={false}
                onClick={() => handleCloneClick()}
                className="w-full md:w-auto flex justify-center md:justify-start"
                icon={<Clone></Clone>}
                title="clone record"
            />
            {showModal && (<ConfirmModal
                id="baseModal"
                showModal={showModal}
                overlayClass="bg-overlay-1"
                cardWidth="lg:max-w-2xl lg:w-2/3 w-full"
                modalTitle="Confirm"
                modalTitleClass="text-neutral-600"
                modalSecondaryBtn={true}
                modalHeader={true}
                primaryBtnClick={() => handleClone({ cloneRelatedList: true })}
                modalFooterClass="py-5"
                primaryBtnClass={'uppercase tracking-widest'}
                modalFooter={true}
                modalBodyClass="text-center"
                baseModal={true}
                cardPadding={'0'}
                btnSize={'small'}
                closeModalPopup={closeModal}
                secondaryBtnClick={() => handleClone({ cloneRelatedList: false })}
                cardRadius="rounded-lg"
                primaryBtnLabel={'Yes'}
                secondaryBtnLabel="No"
            >
                <div>Do you want to clone the related lists as well?</div>
            </ConfirmModal>)}
        </div>
    );
};

export default CloneButton;
