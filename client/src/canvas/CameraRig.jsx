import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useSnapshot } from "valtio";

import state from "../store";

const CameraRig = ({ children }) => {
  const groupRef = useRef();
  const stateSnap = useSnapshot(state);

  //Allows us to execute code on every rendered frame
  useFrame((state, delta) => {
    //Breakpoints
    const biggerScreensBreakpoint = window.innerWidth <= 1260;
    const mobileBreakpoint = window.innerWidth <= 600;

    //Initial model position
    let targetPosition = [-0.4, 0, 2];

    if (stateSnap.intro) {
      if (biggerScreensBreakpoint) targetPosition = [0, 0, 3];
      if (mobileBreakpoint) targetPosition = [0, 0.2, 2.5];
    } else {
      if (mobileBreakpoint) targetPosition = [0, 0.2, 2.5];
      else {
        targetPosition = [0, 0, 2];
      }
    }

    //Set model camera position
    easing.damp3(state.camera.position, targetPosition, 0.25, delta);

    //Set smooth model rotation.
    if (!stateSnap.intro) {
      easing.dampE(
        groupRef.current.rotation,
        [state.pointer.y / 10, -state.pointer.x / 5, 0],
        0.25,
        delta
      );
    }
  });

  return <group ref={groupRef}>{children}</group>;
};

export default CameraRig;
