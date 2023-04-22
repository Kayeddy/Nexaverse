import { proxy } from "valtio"; //Allows us to establish one or more contexts inside the different states of out application

const state = proxy({
  intro: true, //Is the user currently on the homepage?
  color: "#FFA05B", //Initial color profile for the main page
  isLogoTexture: true, //Does the shirt currently has a texture applied?
  isFullTexture: false, //Does the texture style applied covers the shirt fully?
  logoDecal: "./threejs.png", //Initial decal on shirt
  fullDecal: "./threejs.png", //Initial full decal on shirt
});

export default state;
