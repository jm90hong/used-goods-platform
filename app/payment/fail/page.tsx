'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';

function FailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const code = searchParams.get('code');
  const message = searchParams.get('message');

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h2 style={{ color: 'red' }}>❌ 결제 실패</h2>
      <p>에러 코드: {code}</p>
      <p>실패 사유: {message}</p>
      <button
        onClick={() => router.push('/checkout')}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#2563eb',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        다시 결제 시도
      </button>
    </div>
  );
}

export default function FailPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <FailContent />
    </Suspense>
  );
}