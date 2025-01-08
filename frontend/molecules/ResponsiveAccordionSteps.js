import Button from "../../atoms/zenovo-sass/Button";
import { Cancel, ChevronDown, Cross, Tick } from "../../assets/Icons";
import SectionHeader from "../../atoms/zenovo-sass/SectionHeader";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const ResponsiveAccordionSteps = ({
  steps,
  activePage,
  nextPage,
  prevPage,
  gotoPage,
  preview,
  modalView,
  modalClose,
  title,
  isBookingPresent = false,
  footer,
}) => {
  const activeStepData = steps.find((item) => item.id == activePage);

  if (!steps.length) {
    return <></>;
  }

  const isMobile = false;
  // window?.innerWidth > 767 ? false : true;

  return (
    <div
      className={`max-w-[1480px] mx-auto flex items-start justify-center gap-6 w-full h-full py-4 md:px-12 md:py-12 ${
        !modalView && "bg-neutral-0"
      }`}
    >
      <div className="p-4 md:p-6 rounded-lg boxShadow md:max-w-[calc(100%-340px)] bg-neutral-0 w-[1200px]  md:min-w-[820px]  relative">
        {modalView && (
          <button
            onClick={() => {
              modalClose && modalClose();
            }}
            className="absolute top-6 rounded-full right-6 w-8 h-8 bg-neutral-3 flex justify-center items-center hover:rotate-90 transition-all"
          >
            <Cross />
          </button>
        )}

        <div
          className={`w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:pb-4 ${
            modalView && "md:pr-14"
          }`}
        >
          <div className="flex items-center gap-4 ">
            <SectionHeader title={title} tagColorClass="bg-secondary-2" />
            <AnimatePresence>
              {activePage != -1 && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="md:hidden inline-flex h-8 rounded-[12px] text-[14px] bg-secondary-4 px-3 py-4 items-center justify-center font-inter font-[500]"
                >
                  {activePage + 1}/{steps.length}{" "}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <div
            className={`flex flex-col md:flex-row w-full md:w-auto md:gap-4 overflow-x-auto overflow-y-auto`}
          >
            {steps.map((step, index) => {
              return (
                <React.Fragment key={index}>
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={
                      activePage == -1
                        ? { opacity: 1 }
                        : activePage == step.id
                        ? { opacity: isMobile ? 0 : 1 }
                        : { opacity: isMobile ? 0 : 1 }
                    }
                    key={index}
                    onClick={() => {
                      if (activePage == -1) {
                        gotoPage(step.id);
                        return;
                      }
                      if (activePage == step.id) {
                        gotoPage(-1);
                      } else {
                        gotoPage(step.id);
                      }
                    }}
                    className={`relative flex flex-row md:flex-col py-4 md:py-0 justify-between  border-b md:border-b-0 w-full md:w-auto items-center gap-2 ${
                      activePage == -1
                        ? "flex"
                        : activePage == step.id
                        ? "hidden md:flex"
                        : "hidden md:flex"
                    }
                    `}
                    disabled={!isBookingPresent}
                  >
                    {index != 0 ? (
                      <span className="-z-10 hidden md:inline-block absolute w-[120%] h-[2px] bg-neutral-3 top-3 transform translate-y-[-50%] right-[60%]"></span>
                    ) : (
                      <span className="-z-11 hidden md:inline-block absolute w-[120%] h-[2px] bg-neutral-0 top-3 transform translate-y-[-50%] right-[60%]"></span>
                    )}

                    <div
                      className={`hidden relative z-10 rounded-full p-[4px] w-6 h-6 md:flex justify-center items-center border-2 bg-neutral-0 border-neutral-3 ${
                        activePage == index && "bg-primary-1 border-primary-1"
                      }`}
                    >
                      <Tick />
                    </div>
                    <span className="flex text-[14px] md:text-[12px] font-[500] whitespace-nowrap">
                      {step.stepLabel}
                    </span>
                    <span className="inline-flex md:hidden">
                      <ChevronDown />
                    </span>
                  </motion.button>

                  <AnimatePresence>
                    <motion.div
                      key={activePage == index && activeStepData?.component}
                      className="block md:hidden md:mt-4"
                      layout
                      style={{ originY: 0 }}
                      animate={{ maxHeight: "100vh" }}
                      exit={{ maxHeight: 0 }}
                      transition={{
                        duration: 0.5,
                      }}
                    >
                      {activePage == index && activeStepData?.component && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          {activeStepData.component}
                        </motion.div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </React.Fragment>
              );
            })}
          </div>
        </div>
        <div
          className={`hidden md:block md:py-4 overflow-y-auto overflow-x-auto  border-b md:border-b-none border-t border-neutral-3 ${
            modalView && "max-h-[60vh]"
          }`}
        >
          <div>{activeStepData?.component && activeStepData.component}</div>
        </div>
        {!!activePage && activePage == -1 && (
          <div>
            {footer ? (
              footer
            ) : (
              <div className="flex gap-4 justify-end items-center pt-6">
                <Button
                  type="button"
                  label={activePage <= 0 ? "Cancel" : "Back"}
                  primary={false}
                  onClick={prevPage}
                  state={"default"}
                ></Button>

                <Button
                  type="button"
                  label={steps.length - 1 <= activePage ? "Confirm" : "Next"}
                  primary={true}
                  onClick={() => nextPage()}
                  state={"default"}
                ></Button>
              </div>
            )}
          </div>
        )}
      </div>
      {preview && (
        <div className="w-[340px] bg-neutral-0 rounded-[12px]">{preview}</div>
      )}
    </div>
  );
};

export default ResponsiveAccordionSteps;
