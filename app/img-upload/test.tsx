// app/upload/page.tsx (또는 사용하려는 컴포넌트 파일)
"use client";

import React, { useState } from "react";
import { storage } from "@/lib/firebase"; // 위에서 만든 firebase 설정 불러오기
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function ImageUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);

  // 파일 선택 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // 업로드 실행 핸들러
  const handleUpload = () => {
    if (!file) return alert("파일을 선택해주세요!");

    setUploading(true);

    // 1. Storage에 저장될 경로 및 파일명 지정 (중복 방지를 위해 timestamp 추가)
    const storageRef = ref(storage, `images/${Date.now()}_${file.name}`);

    // 2. 업로드 태스크 생성
    const uploadTask = uploadBytesResumable(storageRef, file);

    // 3. 업로드 진행 상태 모니터링
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // 백분율 진행도 계산
        const progressPercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressPercent);
      },
      (error) => {
        // 업로드 실패 시 에러 처리
        console.error("업로드 에러:", error);
        alert("업로드에 실패했습니다.");
        setUploading(false);
      },
      () => {
        // 4. 업로드 완료 후 다운로드 가능한 URL 가져오기
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
          setUploading(false);
          setFile(null);
          setProgress(0);
          alert("업로드 완료!");
        });
      }
    );
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <h2>Firebase Storage 이미지 업로드</h2>
      
      <input type="file" accept="image/*" onChange={handleFileChange} />
      
      <button 
        onClick={handleUpload} 
        disabled={!file || uploading}
        style={{ marginTop: "10px", display: "block" }}
      >
        {uploading ? "업로드 중..." : "업로드 시작"}
      </button>

      {/* 진행 상태 바 */}
      {uploading && (
        <div style={{ marginTop: "10px" }}>
          <progress value={progress} max="100" /> {progress}%
        </div>
      )}

      {/* 업로드 완료 후 이미지 미리보기 */}
      {imageUrl && (
        <div style={{ marginTop: "20px" }}>
          <p>업로드된 이미지 미리보기:</p>
          <img src={imageUrl} alt="Uploaded" style={{ maxWidth: "100%", height: "auto" }} />
          <p style={{ fontSize: "12px", wordBreak: "break-all" }}>
            <strong>URL:</strong> <a href={imageUrl} target="_blank" rel="noreferrer">{imageUrl}</a>
          </p>
        </div>
      )}
    </div>
  );
}