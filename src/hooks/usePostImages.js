import { db } from "../firebase.config.js";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useEffect } from "react";
import { data } from "../data.js";

const firebaseData = {
  "1:1": {    
    "A": "filepath",
    "B": "filepath"
  }
}


export function usePostImages() {
  useEffect(() => {
    async function getImageUrl(imageUrl) {
      return new Promise((resolve) => {
        const storage = getStorage();
        const imageRef = ref(storage, imageUrl);
        getDownloadURL(imageRef).then((downloadUrl) => {
          resolve(downloadUrl)
        })
      })
    }

    async function getImages() {
      const newData = { ...data };
      for (const [key, values] of Object.entries(newData)) {
        const level = key.split('-');
        const solution = {};
        for (let i in values) {
          const filepath = `level ${level[0]}/${level.join('-')}${values[i]}.glb`;
          const image = await getImageUrl(filepath)
          solution[values[i]] = image
        }
        await setDoc(doc(db, 'solutions', key), {...solution})
      }
    }
    getImages()
  }, [])
}
