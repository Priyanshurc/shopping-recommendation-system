import React, { useEffect, useRef, useState } from "react";
import * as markerjs2 from "markerjs2";
import { getSignedUrl } from "../../services/aws-uploader.service";
import { useRouter } from "next/router";
import Button from "../../atoms/zenovo-sass/Button";

const DamageHighlight = ({
  src = '',onSave, onCancel
}) => {
  const [targetSrc, setTargetSrc] = useState(src); // State to manage target image src 
  const markerContainer = useRef(null);
  const targetContainer = useRef(null);
  const [isCircleVisible, setisCircleVisible] = useState(true);
  const toggleCircle = () => {
    setisCircleVisible(s => !s);
  };
  let markerArea = useRef(null);
  const router = useRouter();
  const { domain } = router.query;
  const initialData = () => {
    if (markerContainer.current && targetContainer.current) {
      markerArea.current = new markerjs2.MarkerArea(markerContainer.current);
      markerArea.current.targetRoot = targetContainer.current;
      markerArea.current.availableMarkerTypes = [markerjs2.EllipseFrameMarker];
      markerArea.current.addEventListener(
        "render",
        (event) => {
          setSrcUrl(event.dataUrl);
          let newImage = true
          if (src === event.dataUrl) {
            newImage = false
          }
          onSave(event.dataUrl, newImage)
          toggleCircle();
        } // Set the target image src
      );
      // markerArea.current.addEventListener("markercreate", (event) => {
      //   const saveAndCloseBtn = targetContainer.current.querySelector(
      //     'div[data-action="render"][title="Save and close"]'
      //   );
      //   saveAndCloseBtn.click(); // Manually clicking save button when marker is created
      // });
      markerArea.current.addEventListener("show", (event) => {
        event.markerArea.createNewMarker(markerjs2.EllipseFrameMarker);
      });
      markerArea.current.addEventListener("beforeclose", (event) => {
        toggleCircle();
      });
    }
  };
  useEffect(() => {
    initialData();
  }, []);

  const [srcUrl, setSrcUrl] = useState('');
  async function fetchData() {
    try {
      if (src) {
        const response = await getSignedUrl(src, { domain });
        if (response.status && response.entity) {
          console.log(response);
          setSrcUrl(response.entity);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div ref={targetContainer} className="rounded-[12px]">
      <img
        ref={markerContainer}
        alt=""
        src={srcUrl}
        crossOrigin="anonymous"
      />
      <div className="flex flex-col ">
        {isCircleVisible && (
          <button
            className="mx-auto py-3"
            onClick={() => {
              toggleCircle();
              markerArea.current?.show();
              const className = `.${markerArea.current.styles._classNamePrefix}toolbox`;
              console.log(className);
              document.querySelector(className).style.display = "none";
              const saveAndCloseBtn = targetContainer.current.querySelector('div[data-action="render"][title="Save and close"]');
              const CloseBtn = targetContainer.current.querySelector('div[data-action="close"][title="Close"]');
              saveAndCloseBtn.style.visibility = "hidden";
              CloseBtn.style.visibility = "hidden";
            }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="20" cy="20" r="19" stroke="#FF6A55" strokeWidth="2" />{" "}
              {/* Changed strokeWidth */}
            </svg>
          </button>
        )}
        <p className="font-inter text-[14px] max-w-[250px]">
          <span className="text-neutral-4">
            *Select the circle and drag around the damage area, click 'Next' to proceed
          </span>
        </p>
      </div>
      <div className="flex gap-4 justify-end items-center mt-4 mb-4">
        <Button
          type="reset"
          label="Cancel"
          primary={false}
          onClick={onCancel}
          className="w-full flex justify-center"
        ></Button>
        <Button
          id='damage-highlight-nextButton'
          type="button"
          label={"Next"}
          onClick={() => {
            const saveAndCloseBtn = targetContainer.current.querySelector(
              'div[data-action="render"][title="Save and close"]'
            );
            if(saveAndCloseBtn == null) {
              onSave(targetSrc, false)
            } else{
              saveAndCloseBtn?.click(); // Manually clicking save button when marker is created
            }
          }}
          className="w-full flex justify-center"
          state={"default"}
          size="small"
        ></Button>
      </div>
    </div>
  );
};

export default DamageHighlight;
