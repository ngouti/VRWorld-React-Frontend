// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import * as OVRUI from 'ovrui'
import {ReactInstance} from 'react-360-web';
import ControllerRayCaster from 'react-vr-controller-raycaster';
import * as THREE from 'three'
import SimpleRaycaster from "simple-raycaster";
function init(bundle, parent, options = {}) {
 
// console.log(this.props.params.userId)
  const r360 = new ReactInstance(bundle, parent, {
    fullScreen: true,
    cursorVisibility: "visible",
    ...options,
  });

  
  

  r360.renderToSurface(
    r360.createRoot('stream', {
      photos: [
        {uri: './static_assets/alaska_talkeetna.jpg', title: "alaska_talkeetna"},
        {uri: './static_assets/SaguaroWest.jpg', title: "SaguaroWest"},
        {uri: './static_assets/tree.jpg', title: "San Fran"},

        
      ],
    }),
    r360.getDefaultSurface()
  );

  r360.controls.clearRaycasters();
  r360.controls.addRaycaster(SimpleRaycaster);
 
}



window.React360 = {init};






// import * as OVRUI from 'ovrui'
// import {ReactInstance} from 'react-360-web';
// import ControllerRayCaster from 'react-vr-controller-raycaster';
// import * as THREE from 'three'
// import SimpleRaycaster from "simple-raycaster";


// function init(bundle, parent, options = {}) {

//   // onClick = () => {
//   //   r360.compositor.setBackground(r360.getAssetURL('tree.jpg'));
//   // r360.controls.clearRaycasters();
//   // r360.controls.addRaycaster(SimpleRaycaster);
//   // }


//   const scene = new THREE.Scene()
//   const r360 = new ReactInstance(bundle, parent, {
   
//     // Add custom options here
//     fullScreen: true,
//     cursorVisibility: "visible",
//     ...options,
    
//   });

//   // Render your app content to the default cylinder surface
//   r360.renderToSurface(
//     r360.createRoot('Playing360', { /* initial props */ }),
//     r360.getDefaultSurface()
//   );

//   // Load the initial environment
//   r360.compositor.setBackground(r360.getAssetURL('tree.jpg'));
//   r360.controls.clearRaycasters();
//   r360.controls.addRaycaster(SimpleRaycaster);
// }

// window.React360 = {init};
