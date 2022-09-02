import { initializeApp } from "firebase/app";
import { getStorage, getDownloadURL, ref, listAll } from "firebase/storage";
import { doc, collection, getDocs, getDoc, addDoc, getFirestore } from 'firebase/firestore';
import Placeholder from '../Assets/Placeholder.png';

const firebaseConfig = {
  apiKey: "AIzaSyB4UrAfl9MrPQ45TIxt989K46s1hbWDuSY",
  authDomain: "react-cars-e19ad.firebaseapp.com",
  projectId: "react-cars-e19ad",
  storageBucket: "react-cars-e19ad.appspot.com",
  messagingSenderId: "746552124404",
  appId: "1:746552124404:web:081d7eaa85d8d114550fa1"
};

export const CarObjectModel = {
  "Year": "",
  "Odometer": "",
  "Make": "",
  "Model": "",
  "Series": "",
  "Damage Type": "",
  "Damage Location": "",
  "Exterior": "",
  "Interior": "",
  "Body Style": "",
  "Transmission": "",
  "Drive": "",
  "Engine": "",
  "Cylinders": "",
  "Title": "",
  "Airbags": "",
  "Start Code": "",
  "Key": "",
};

const firebaseApp = initializeApp(firebaseConfig);
const DB = getFirestore(firebaseApp);
export default DB;
export const Storage = getStorage(firebaseApp);
export const CarsRef = collection(DB, 'Cars');

export async function FetchCars() {
  try {
    const Data = await getDocs(CarsRef)
    const AllCars = Data.docs.map((doc) => ({ ...doc.data(), ID: doc.id }))
    return (AllCars);
  } catch (error) {
    console.log(error)
  }

}

export async function FetchCar(CarID) {
  try {
    const CarRef = doc(DB, 'Cars', CarID);
    const Doc = await getDoc(CarRef);
    return ({ ...Doc.data(), ID: Doc.id });
  } catch (error) {
    console.log(error)
  }
}

export async function FetchCarThubmnail(CarID) {
  try {
    const Folder = ref(Storage, "Cars/" + CarID);
    const Images = await listAll(Folder)
    if (Images.items.length > 0) {
      const URL = await getDownloadURL(Images.items[0])
      return (URL);
    }
    else {
      return (Placeholder);
    }
  }
  catch (error) {
    console.log(error);
  }
}

export async function FetchCarImages(CarID) {
  var CarImages = [];
  const Folder = ref(Storage, "Cars/" + CarID);
  const Images = await listAll(Folder);
  if (Images.items.length > 0) {
    for (Image of Images.items) {
      const URL = await getDownloadURL(Image);
      CarImages.push({ original: URL, thumbnail: URL });
    };
  }
  else {
    return [{ original: "/Placeholder.png", thumbnail: "/Placeholder.png" }];
  }
  return CarImages;
}

export async function AddCar(Car) {
  const Doc = await addDoc(CarsRef, Car);
}