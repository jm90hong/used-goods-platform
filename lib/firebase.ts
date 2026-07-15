// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// 서버 사이드 렌더링(SSR) 중복 초기화 방지
//firebase 앱 초기화
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);


//firebase 인증 초기화
const auth = getAuth(app);

//google 인증 초기화
const googleProvider = new GoogleAuthProvider();

//firebase 스토리지 초기화
const storage = getStorage(app);

export { auth, googleProvider, storage };