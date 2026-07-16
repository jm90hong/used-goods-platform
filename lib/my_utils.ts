
import { storage } from "@/lib/firebase"; // 위에서 만든 firebase 설정 불러오기
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";




const MyUtils = {
    uploadImageToStorage: async ({file, path}: {file: File, path: 'items' | 'users'}) : Promise<string | undefined> =>{
        if (!file) {
            alert("파일을 선택해주세요!");
            return;
        }
        
        // 1. Storage에 저장될 경로 및 파일명 지정 (중복 방지를 위해 timestamp 추가)
        //4자리 알파벳 램덤 문자 생성
        const randomString = Math.random().toString(36).substring(2, 6);
        const storageRef = ref(storage, `${path}/${randomString}_${Date.now()}`);
    
        // 2. 업로드 태스크 생성
        const uploadTask = uploadBytesResumable(storageRef, file);
    
        var result = await uploadTask
    
        var url = await getDownloadURL(storageRef);
        return url;
    }
}

export default MyUtils;



