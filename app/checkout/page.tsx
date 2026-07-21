'use client';

import { loadTossPayments } from '@tosspayments/payment-sdk';

const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY!;

export default function CheckoutPage() {

    
  const handlePayment = async () => {
    try {
      // 1. 토스 SDK 초기화
      const tossPayments = await loadTossPayments(clientKey);

      // 2. 고유 주문번호 생성
      const orderId = `order_${crypto.randomUUID()}`;

      // 3. 카드 결제 요청 (팝업/창 호출)
      await tossPayments.requestPayment('카드', {
        amount: 100,
        orderId: orderId,
        orderName: '테스트 상품',
        customerName: '홍길동',

        // 결제 완료/실패 후 이동할 URL 설정
        successUrl: `${window.location.origin}/payment/success`,
        failUrl: `${window.location.origin}/payment/fail`,
      });
    } catch (error) {
      console.error('결제 요청 중 에러:', error);
    }
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>상품 주문하기</h1>
      <p style={{ marginBottom: '20px' }}>테스트 상품 - 100원</p>

      <button
        onClick={handlePayment}
        style={{
          padding: '12px 24px',
          backgroundColor: '#2563eb',
          color: '#ffffff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
      >
        토스페이먼츠로 100원 결제하기
      </button>
    </div>
  );
}