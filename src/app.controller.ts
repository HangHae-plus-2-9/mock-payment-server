import { Controller, Get, Post, Body } from '@nestjs/common';

type PaymentInfo = {
  amount: number;
  cardNumber: string;
  cardHolder: string;
  expirationDate: string;
  securityCode: string;
};

let IS_SERVER_AVAILABLE = true;
@Controller()
export class AppController {
  @Get('/status')
  checkServerStatus(): string {
    return IS_SERVER_AVAILABLE ? 'Server is available' : 'Server is down';
  }

  @Post('/payment')
  async payment(@Body() paymentInfo: PaymentInfo): Promise<any> {
    if (!IS_SERVER_AVAILABLE) {
      return {
        status: 'error',
        message: 'Server is down',
      };
    }

    console.log(paymentInfo);

    // Simulate some delay
    await someDelay(jitter(500));
    return {
      status: 'success',
      message: 'Payment is successful',
      data: {
        amount: paymentInfo.amount,
        cardNumber: paymentInfo.cardNumber,
        cardHolder: paymentInfo.cardHolder,
        expirationDate: paymentInfo.expirationDate,
        securityCode: paymentInfo.securityCode,
      },
    };
  }

  @Post('/down')
  down(): string {
    IS_SERVER_AVAILABLE = false;
    return 'Server is down';
  }

  @Post('/up')
  up(): string {
    IS_SERVER_AVAILABLE = true;
    return 'Server is up';
  }
}

const someDelay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const jitter = (ms: number): number => {
  return ms + 300 * (Math.random() - 0.5);
};
