'use client';

import { loadTossPayments } from '@tosspayments/payment-sdk';

export default function TossPaymentButton() {
  const handlePayment = async () => {
    // 1. 클라이언트 키로 토스페이먼츠 객체 초기화
    const clientKey = 'test_ck_E92LAa5PVbqaw7bMQqMB37YmpXyJ';
    const tossPayments = await loadTossPayments(clientKey);

    // 2. 고유 주문번호 생성 (실제 서비스에서는 DB 주문 ID 활용)
    const orderId = `order_${crypto.randomUUID()}`;

    try {
      // 3. 카드 결제 요청
      await tossPayments.requestPayment('카드', {
        amount: 10000, // 결제 금액
        orderId: orderId, // 주문 ID
        orderName: '테스트 상품', // 주문명
        customerName: '홍길동', // 구매자 이름
        
        // 결제 성공/실패 시 리다이렉트될 URL (백엔드 또는 성공/실패 페이지)
        successUrl: `${window.location.origin}/payment/success`,
        failUrl: `${window.location.origin}/payment/fail`,
      });
    } catch (error) {
      console.error('결제 요청 중 에러:', error);
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
    >
      토스페이먼츠로 10,000원 결제하기
    </button>
  );
}