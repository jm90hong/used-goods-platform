'use client'

import { useState } from "react";
import { storage } from "@/lib/firebase"; // 위에서 만든 firebase 설정 불러오기
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function ImgUploadPage() {

  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState<string>("업로드 전");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {


        let file = e.target.files[0];
        setFile(file);
        
    }
  }


  const handleUpload = async () => {
    if (!file) {
        alert("파일을 선택해주세요!");
        return;
    }

    setText("업로드 중");
    // 1. Storage에 저장될 경로 및 파일명 지정 (중복 방지를 위해 timestamp 추가)
    const storageRef = ref(storage, `items/${Date.now()}_${file.name}`);

    // 2. 업로드 태스크 생성
    const uploadTask = uploadBytesResumable(storageRef, file);

    var result = await uploadTask

    alert(result);
    setText("업로드 완료");

    var url = await getDownloadURL(storageRef);
    alert(url);
  }


  return (
    <div>
      <h1>ImgUploadPage : {text}</h1>

      {file && (
        <div>
          <img style={{ objectFit: "cover",width: "300px", height: "300px" }} src={URL.createObjectURL(file)} alt="preview" />
        </div>
      )}

      <input type="file" onChange={handleFileChange} />

      <button className="bg-blue-500 text-white p-2 rounded-md" onClick={handleUpload}>Upload</button>
    </div>
  )
}