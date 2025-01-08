import FieldLabel from "../../atoms/zenovo-sass/FieldLabel";
import {
  AlignCenter,
  Bold,
  Italic,
  LinkIcon,
  List,
  Redo,
  Underline,
  Undo,
} from "../../assets/Icons";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import {
  BtnBulletList,
  createButton,
  Editor,
  EditorProvider,
  Toolbar,
} from "react-simple-wysiwyg";
import ViewModeField from "../../atoms/zenovo-sass/ViewModeField";

const BtnBold = createButton("Bold", <Bold />, "bold");
const BtnItalic = createButton("Italic", <Italic />, "italic");
const BtnUnderline = createButton("Align center", <Underline />, "underline");
const BtnLink = createButton("Link", <LinkIcon />, ({ $selection }) => {
  if ($selection?.nodeName === "A") {
    document.execCommand("unlink");
  } else {
    document.execCommand("createLink", false, prompt("URL", "") || undefined);
  }
});
const BtnAlignCenter = createButton(
  "Align center",
  <AlignCenter />,
  "justifyCenter"
);
const BtnUndo = createButton("Undo", <Undo />, "undo");
const BtnRedo = createButton("Redo", <Redo />, "redo");

const WysiwygEditor = ({
  label,
  name,
  id,
  value,
  errors,
  onChange,
  viewMode,
  ...rest
}) => {
  const [html, setHtml] = useState(value || "");

  return (
    <div className="flex flex-col py-2 h-full">
      {label && <FieldLabel name={name} label={label} />}

      {viewMode ? (
        <ViewModeField value={value} />
      ) : (
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            initial={{ x: -10, y: -12, opacity: 0 }}
            animate={[{ x: 0, y: 0 }, { opacity: 1 }]}
            exit={{ x: -10, y: -12, opacity: 0 }}
            transition={{ type: "tween" }}
          >
            <EditorProvider>
              <Editor
                value={html}
                onChange={(e) => {
                  setHtml(e.target.value);
                  onChange && onChange(e.target.value);
                }}
                id={id}
                name={name}
                {...rest}
              >
                <Toolbar>
                  <div>
                    <BtnBold />
                    <BtnItalic />
                    <BtnUnderline />
                    <BtnLink />
                    <BtnBulletList />
                    <BtnAlignCenter />
                  </div>
                  <div>
                    <BtnUndo />
                    <BtnRedo />
                  </div>
                  {/* <BtnAlignCenter /> */}
                </Toolbar>
              </Editor>
            </EditorProvider>

            {errors && errors[name] && (
              <span className="w-full block font-semibold text-error-1 text-xs leading-none text-left pt-2 pl-2">
                {errors[name].message}
              </span>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default WysiwygEditor;
