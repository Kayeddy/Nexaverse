import React from "react";
import { motion, AnimatePresence, color } from "framer-motion";
import { useSnapshot } from "valtio";
import state from "../store";
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from "../config/motion";
import { CustomButton } from "../components";

const Home = () => {
  const stateSnap = useSnapshot(state);

  return (
    <AnimatePresence>
      {stateSnap.intro && (
        <motion.section className="home" {...slideAnimation("left")}>
          <motion.header {...slideAnimation("down")}>
            <img
              src="./threejs.png"
              alt="logo"
              className="w-8 h-8 object-contain"
            />
          </motion.header>
          <motion.div className="home-content" {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className="head-text">
                Hello there fashion traveler{" "}
                <span className="inline-flex items-center">
                  <img
                    src="https://em-content.zobj.net/source/microsoft-teams/337/smiling-face-with-sunglasses_1f60e.png"
                    alt=""
                    className="w-10 h-10"
                  />
                </span>
                <br className="xl:block hidden" />
                Welcome to the{" "}
                <motion.span style={{ color: stateSnap.color }}>
                  Nexaverse
                </motion.span>
              </h1>
            </motion.div>

            <motion.div
              className="flex flex-col gap-5"
              {...headContentAnimation}
            >
              <p className="max-w-md font-normal text-gray-600 text-[1.2rem]">
                Create your unique and exclusive clothes design, and explore the
                wonderful world of the <strong> Nexaverse </strong>
              </p>

              <CustomButton
                type="filled"
                title="Start customizing"
                handleClick={() => (state.intro = false)}
                styles="w-fit px-4 py-2.5 font-bold text-md"
              />
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Home;
