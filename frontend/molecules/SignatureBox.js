import React, { useRef, useState } from "react";
import Signature from "@uiw/react-signature";
import { path } from "rambda";
import FieldLabel from "../../atoms/zenovo-sass/FieldLabel";
const SignatureBox = ({
  label,
  name,
  id,
  viewMode,
  onChange,
  onClear,
  values,
  errors,
  rest,
  points,
  handlePoints,
  defaultPoints
}) => {
  const $svg = useRef(null);
  // const [points, setPoints] = useState(value || []);
  // const handlePoints = (data) => {
  //   if (data.length > 0) {
  //     setPoints([...points, data]);
  //     onChange && onChange(points);
  //   }
  // };

  const handle = (evn) => $svg.current?.clear();
  const errorMessage = path(name?.split("."), errors)?.message;
  return (
    <div>
      {label && <FieldLabel name={name} label={label} />}
      <div className="bg-neutral-2 rounded-[12px] overflow-hidden">
        <Signature
          name={name}
          ref={$svg}
          points={points}
          defaultPoints={defaultPoints}
          options={{
            smoothing: 0,
          }}
          style={{ "--w-signature-background": "#f4f4f4" }}
          onPointer={handlePoints}
          readonly={viewMode}
          {...rest}
        />

        {errors && errorMessage && !readOnly && (
          <span className="w-full block font-semibold text-secondary-1 text-xs leading-none text-left pt-2 pl-2">
            {errorMessage}
          </span>
        )}
      </div>
    </div>
  );
};

export default SignatureBox;
