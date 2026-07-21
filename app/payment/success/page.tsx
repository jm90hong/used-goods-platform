'use client';

import { useAuthStore } from '@/stores/useAuthStore';
import User from '@/types/User';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const { currentUser,setCurrentUser } = useAuthStore();

  // 토스에서 쿼리스트링으로 넘겨주는 결제 정보 추출
  const paymentKey = searchParams.get('paymentKey');
  const orderId = searchParams.get('orderId');
  const amount = searchParams.get('amount');

  const itemIdx = searchParams.get('itemIdx');
  const userIdx = searchParams.get('userIdx');
  const method = searchParams.get('method');

  useEffect(() => {
    async function confirmPayment() {
      if (!paymentKey || !orderId || !amount || !itemIdx || !userIdx || !method) {
        setErrorMessage('잘못된 접근입니다. 결제 정보가 존재하지 않습니다.');
        setIsLoading(false);
        return;
      }

      try {
        // Express 백엔드로 최종 결제 승인 요청
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/toss/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentKey,
            orderId,
            amount: Number(amount),
            item_idx: Number(itemIdx),
            user_idx: Number(userIdx),
            method: method,
            provider: 'TOSS',
          }),
        });

        const result = await response.json();

        console.log('====결제완료 응답===');
        console.log(result);

        if(result.success){
          var remaining_point = result.data.remaining_point;
          setCurrentUser({
            ...currentUser as User,
            point: remaining_point,
          });
        }

        if (!response.ok) {
          throw new Error(result.message || '결제 승인 처리 중 에러가 발생했습니다.');
        }

        setIsLoading(false);
      } catch (err: any) {
        setErrorMessage(err.message || '결제 중 오류가 발생했습니다.');
        setIsLoading(false);
      }
    }

    confirmPayment();
  }, [paymentKey, orderId, amount]);

  if (isLoading) {
    return <div style={{ padding: '50px', textAlign: 'center' }}>결제 승인 요청 중...</div>;
  }

  if (errorMessage) {
    return (
      <div style={{ padding: '50px', textAlign: 'center', color: 'red' }}>
        <h2>결제 승인 실패</h2>
        <p>{errorMessage}</p>
        <button onClick={() => router.push('/checkout')}>다시 결제하기</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h2>🎉 결제가 성공적으로 완료되었습니다!</h2>
      <p>주문 번호: {orderId}</p>
      <p>결제 금액: {Number(amount).toLocaleString()}원</p>
      <button onClick={() => router.push('/')}>메인으로 돌아가기</button>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <SuccessContent />
    </Suspense>
  );
}