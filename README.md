# Ubongo 3D

This is a fan-made too desidned to show solutions.

Note: There can be more than one alternate solutions, but I aim to keep the tool straigtforward and won't be adding additional features.

![6226361205535128849](https://github.com/user-attachments/assets/163cc098-e5ad-410d-aef2-843ef21c11c8)

## Disclaimer

This is an unofficial app developed as a private project and is not affiliated with KOSMOS. This app only supports the 2021 English edition of Ubongo 3D.

## Browsing

The web version is available [here](https://ubongo-3d-d2125.web.app/).

## Devlopment
Developed in React with Vite.

To run the project locally, follow these steps:

1. Clone the repository

```
cd your-folder-name
git clone https://github.com/CH-Low/ubongo3d.git
```

2. Install dependencies:
```
npm install
```

3. Run the app:
```
npm run dev
```

## Resources Used

- **3D Modeling**: [Asset Forge](https://assetforge.io/)
- **3D Display**: [Three.js](https://threejs.org/)

## Asset Forge Export Model Guidelines

1. **Center the Model**: Before exporting, make sure the model is centered to maintain proper alignment.
2. **Export Settings**:
   - Set the format to **GLTF** for compatibility.
   - Change the orientation to **"Z is up"** to match standard 3D coordinate systems.
   - Rotate Z 180 degree for the correct placement.
