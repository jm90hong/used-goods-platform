import { loadTossPayments } from "@tosspayments/payment-sdk";


const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY!;


type TossPaymentProps = {
    amount: number;
    method: '카드' | 'bank' | 'mobile' | 'phone';
    orderName: string;
    customerName: string;

    //db쪽 추가 정보
    itemIdx: number;
    userIdx: number;
}


var methodMap = {
    '카드': 'CARD',
}

const MyPayment = {
    requestTossPayment: async (props: TossPaymentProps) => {
        try {
            // 1. 토스 SDK 초기화
            const tossPayments = await loadTossPayments(clientKey);
        
            // 2. 고유 주문번호 생성
            const orderId = `order_${crypto.randomUUID()}`;
        
            // 3. 카드 결제 요청 (팝업/창 호출)
            await tossPayments.requestPayment(props.method as any, {
                amount: props.amount,
                orderId: orderId,
                orderName: props.orderName,
                customerName: props.customerName,
        
                // 결제 완료/실패 후 이동할 URL 설정
                successUrl: `${window.location.origin}/payment/success?itemIdx=${props.itemIdx}&userIdx=${props.userIdx}&method=${methodMap[props.method as keyof typeof methodMap]}`,
                failUrl: `${window.location.origin}/payment/fail`,
        });
        } catch (error) {
            console.error('결제 요청 중 에러:', error);
        }
    }
}

export default MyPayment;


