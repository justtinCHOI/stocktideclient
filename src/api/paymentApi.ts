interface PaymentWindow {
    IMP?: any;
}

declare const window: PaymentWindow;

// Payment 관련 타입 정의
interface PaymentData {
    total_price: number;
    address: string;
    phone: string;
}

interface PaymentResponse {
    code: number;
    msg: string;
}

interface PaymentSuccessResponse {
    success: boolean;
    // 기타 결제 성공시 필요한 응답 필드들
    [key: string]: any;
}

const payBtn = document.getElementById('payBtn');

if (payBtn) {
    payBtn.addEventListener('click', () => {
        requestPay();
    });
}

function calculateAmount(priceElements: NodeListOf<Element>): number {
    return Array.from(priceElements).reduce((sum, price) => {
        const priceText = price.textContent || '0';
        return sum + parseInt(priceText.replace(/[^0-9]/g, ''), 10);
    }, 0);
}

function generateUniqueNumber() {
    // 현재 시간을 이용하여 고유한 숫자 생성
    const timestamp = Date.now();

    // Math.random()을 이용하여 무작위 숫자 생성
    const randomValue = Math.random();

    // 위의 두 값을 조합하여 고유한 일련번호 생성
    return `${timestamp}-${randomValue}`;
}

export function requestPay() {

    if (!window.IMP) {
        console.warn('IMP not initialized');
        return;
    }

    const IMP = window.IMP;
    IMP.init('imp76806111'); // 결제 요청 시점에 초기화

    let prices = document.querySelectorAll('.price');
    const amount = calculateAmount(prices);

    // let amount= 0;
    // prices.forEach(price => {
    //     amount += parseInt(price.innerText.replace(/[^0-9]/g, ''));
    // })
    //

    const buyerEmailElement = document.getElementById('email') as HTMLInputElement;
    const buyerPhoneElement = document.getElementById('phone-num') as HTMLInputElement;
    const buyerNameElement = document.getElementById('name') as HTMLInputElement;
    const addressElement = document.getElementById('address') as HTMLInputElement;
    const detailAddressElement = document.getElementById('detailAddress') as HTMLInputElement;

    if (!buyerEmailElement || !buyerPhoneElement || !buyerNameElement ||
      !addressElement || !detailAddressElement) {
        console.error('Required form elements not found');
        return;
    }

    let buyer_email = buyerEmailElement.value;
    let buyer_phone = buyerPhoneElement.value;
    let buyer_name = buyerNameElement.value;
    let address = addressElement.value;
    let detailAddress = detailAddressElement.value;
    let fullAddress = address + ' ' + detailAddress;

    let company_name = "Idle";

    const data2 = {
        total_price : amount,
        address : address,
        phone : buyer_phone,

    };

    fetch("/api/POST/checkPayment", {
        method: 'POST', // 요청 방식 설정
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json', // 내용 타입을 JSON으로 지정
        },
        body: JSON.stringify(data2)
    })
        .then(response => {
            if (!response.ok) { // 응답 상태가 OK가 아닐 경우 에러 처리
                alert("인터넷 이슈!!");
                throw new Error('Network response was not ok');
            }
            return response.json(); // 응답 본문을 JSON으로 변환
        })
        .then(data => {
            // 서버로부터 받은 데이터 처리
            if(data.code === 666){
                alert(data.msg);
                location.href="/logins"
            }
            if(data.code === 400) {
                alert(data.msg);
                location.href = "/main"
            }
            if(data.code === 500){
                alert(data.msg);
                location.href="/cart"
            }
            if (data.code === 200) {
                alert("카카오페이가 떠야해");
                IMP.request_pay({
                        pg: "kcp.{상점ID}",
                        pay_method: "card",
                        merchant_uid: generateUniqueNumber(),   // 주문번호
                        name: company_name,
                        amount: amount,                         // 숫자 타입
                        buyer_email: buyer_email,
                        buyer_name: buyer_name,
                        buyer_tel: buyer_phone,
                        buyer_addr: fullAddress,
                        buyer_postcode: "01181"
                    },
                    function (rsp:PaymentSuccessResponse) { // callback
                        if (rsp.success) {
                            console.log(data);
                            // sendData("/api/POST/payment", data2, paymentSuccess, null)
                            sendData("/api/POST/payment", data2)
                            paymentSuccess();
                        } else {
                            console.log(rsp);
                        }
                    });
            } else {
                handlePaymentResponse(data);
            }
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });
    console.log(amount)
}

const paymentSuccess = () =>{
    location.href = "/cart"
}

async function sendData(url: string, data: PaymentData): Promise<void> {
    try {
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
    } catch (error) {
        console.error('Failed to send payment data:', error);
        throw error;
    }
}

function handlePaymentResponse(response: PaymentResponse): void {
    switch (response.code) {
        case 666:
            alert(response.msg);
            location.href = "/logins";
            break;
        case 400:
            alert(response.msg);
            location.href = "/main";
            break;
        case 500:
            alert(response.msg);
            location.href = "/cart";
            break;
    }
}