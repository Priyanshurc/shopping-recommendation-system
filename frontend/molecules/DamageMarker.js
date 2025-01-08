import React, { useEffect, useState } from "react";
import ImageMarker, { Marker } from "react-image-marker";

export const DamageDotMarker = (props) => {
  return (
    <p
      className={`w-5 h-5 min-w-[1.25rem] flex justify-center items-center border-2  text-neutral-0 rounded-full font-inter text-[11px] cursor-default ${props.damageMarkerType == 1
        ? "border-error-1 bg-error-2"
        : "border-primary-5 bg-primary-1"
        } `}
    >
      {props.itemNumber + 1}
    </p>
  );
};

const DamageMarker = ({
  onDamageMarked,
  viewMode,
  markers,
  setMarkers,
  allowMultiMarker = false,
}) => {

  return (
    <div>
      <ImageMarker
        src="/images/exterior-damage-car.png"
        markers={markers}
        markerComponent={DamageDotMarker}
        onAddMarker={(marker) => {
          if (viewMode) return;
          if (allowMultiMarker) {
            setMarkers([...markers, marker]);
          } else {
            setMarkers([marker]);
          }
          onDamageMarked && onDamageMarked(marker);
        }}
      />
    </div>
  );
};

export default DamageMarker;
