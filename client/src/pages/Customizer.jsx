import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";

import config from "../config/config";
import state from "../store";
import { download } from "../assets";
import { downloadCanvasToImage, reader } from "../config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";
import { fadeAnimation, slideAnimation } from "../config/motion";

import {
  AIImagePicker,
  ColorPicker,
  CustomButton,
  FilePicker,
  Tab,
} from "../components";

const Customizer = () => {
  const stateSnap = useSnapshot(state);

  const [uploadFile, setUploadFile] = useState("");
  const [AIPrompt, setAIPrompt] = useState("");
  const [generatingImage, setGeneratingImage] = useState(false);
  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = result;
  };
  // Read the file that the user wishes to upload
  const readFile = (type) => {
    reader(file).then((result) => {
      handleDecals(type, result);
      setActiveEditorTab("");
    });
  };
  // Show tab content depending on the active tab
  const changeTabContent = () => {
    if (activeEditorTab === "colorpicker") {
      return <ColorPicker />;
    } else if (activeEditorTab === "filepicker") {
      return <FilePicker file={uploadFile} setFile={setUploadFile} />;
    } else if (activeEditorTab === "aipicker") {
      return <AIImagePicker />;
    } else {
      return null;
    }
  };

  return (
    <AnimatePresence>
      {!stateSnap.intro && (
        <>
          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              title="Go back"
              handleClick={() => (state.intro = true)}
              styles="w-fit px-4 py-2.5 font-bold text-md"
            />
          </motion.div>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation("left")}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}

                {changeTabContent()}
              </div>
            </div>
          </motion.div>
          <motion.div
            className="filtertabs-container"
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                handleClick={() => {}}
                isFilterTab
                isActiveTab=""
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
