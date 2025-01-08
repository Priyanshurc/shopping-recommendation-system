import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { Cross } from "../../assets/Icons";
const Modal = ({
  show,
  onSave,
  onCancel,
  onClose,
  showClose = true,
  showFooter = false,
  closeOnClickOutside = false,
  modalWrapperClass = "flex justify-center items-start",
  modalContainerClass = "w-full",
  children,
}) => {
  useEffect(() => {
    if (show) {
      document.body.style.overflowY = "hidden";
      document.body.style.marginRight = "8px";
    } else {
      document.body.style.overflowY = "auto";
      document.body.style.marginRight = "0px";
    }
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={`modalContainer fixed z-999 top-0 left-0 w-full h-full bg-overlay-1 ${modalWrapperClass}`}
          key="box"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            onClick={closeOnClickOutside ? onClose() : () => {}}
            className="absolute top-0 left-0 w-full h-full"
          ></div>
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            className={`max-w-[98vw] p-6  h-auto max-h-[calc(100vh-4rem)] mt-[1vh] bg-neutral-0 boxShadow rounded-lg overflow-auto relative ${
              modalContainerClass && modalContainerClass
            }`}
          >
            {children}
            {showClose && (
              <motion.button
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                }}
                whileHover={{ scale: 0.97, rotate: 90 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="text-error-2 hover:text-error-1 bg-neutral-2 hover:bg-neutral-1 w-6 h-6 rounded-full flex justify-center items-center absolute top-4 right-4 "
              >
                <Cross />
              </motion.button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  onClose: PropTypes.func,
  showClose: PropTypes.bool,
  showFooter: PropTypes.bool,
  closeOnClickOutside: PropTypes.bool,
  children: PropTypes.node,
};
