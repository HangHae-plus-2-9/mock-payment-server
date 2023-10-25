import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';

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
  checkServerStatus(@Res() res: Response): any {
    if (!IS_SERVER_AVAILABLE) {
      return res.status(500).json({
        status: 'error',
        message: 'Server is down',
      });
    }
    return res.status(200).json({
      status: 'success',
      message: 'Server is up',
    });
  }

  @Post('/payment')
  async payment(
    @Body() paymentInfo: PaymentInfo,
    @Res() res: Response,
  ): Promise<any> {
    if (!IS_SERVER_AVAILABLE) {
      return res.status(500).json({
        status: 'error',
        message: 'Server is down',
      });
    }

    console.log(paymentInfo);

    // Simulate some delay
    await someDelay(jitter(500));
    return res.status(200).json({
      status: 'success',
      message: 'Payment is successful',
      data: {
        amount: paymentInfo.amount,
        cardNumber: paymentInfo.cardNumber,
        cardHolder: paymentInfo.cardHolder,
        expirationDate: paymentInfo.expirationDate,
        securityCode: paymentInfo.securityCode,
      },
    });
  }

  @Post('/down')
  down(@Res() res: Response): any {
    IS_SERVER_AVAILABLE = false;
    return res.status(200).json({
      status: 'success',
      message: 'Server is down',
    });
  }

  @Post('/up')
  up(@Res() res: Response): any {
    IS_SERVER_AVAILABLE = true;
    return res.status(200).json({
      status: 'success',
      message: 'Server is up',
    });
  }
}

const someDelay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const jitter = (ms: number): number => {
  return ms + 300 * (Math.random() - 0.5);
};
