# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


## Resources Used

- **3D Modeling**: [Asset Forge](https://assetforge.io/)
- **3D Display**: [Three.js](https://threejs.org/)

## Asset Forge Export Model Guidelines

1. **Center the Model**: Before exporting, make sure the model is centered to maintain proper alignment.
2. **Export Settings**:
   - Set the format to **GLTF** for compatibility.
   - Change the orientation to **"Z is up"** to match standard 3D coordinate systems.
   - Rotate Z 180 degree for the correct placement.