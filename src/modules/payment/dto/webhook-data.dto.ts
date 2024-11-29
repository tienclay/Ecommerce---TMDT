import { ApiProperty } from '@nestjs/swagger';

export class WebhookDataDto {
  @ApiProperty({
    description: 'Order code associated with the webhook',
    example: 1001,
  })
  orderCode: number;

  @ApiProperty({
    description: 'Amount involved in the transaction',
    example: 5000,
  })
  amount: number;

  @ApiProperty({
    description: 'Description of the transaction',
    example: 'Payment for order #1001',
  })
  description: string;

  @ApiProperty({
    description: 'Account number used for the transaction',
    example: '1234567890',
  })
  accountNumber: string;

  @ApiProperty({
    description: 'Transaction reference code',
    example: 'REF12345',
  })
  reference: string;

  @ApiProperty({
    description: 'Timestamp of the transaction',
    example: '2024-11-25T14:30:00.000Z',
  })
  transactionDateTime: string;

  @ApiProperty({
    description: 'ID of the associated payment link',
    example: 'pl_001',
  })
  paymentLinkId: string;

  @ApiProperty({
    description: 'Transaction code provided by the webhook',
    example: 'TXN123',
  })
  code: string;

  @ApiProperty({
    description: 'Description of the transaction status or result',
    example: 'Transaction successful',
  })
  desc: string;

  @ApiProperty({
    description: 'ID of the counter account bank, if available',
    example: 'BANK001',
    nullable: true,
  })
  counterAccountBankId?: string | null;

  @ApiProperty({
    description: 'Name of the counter account bank, if available',
    example: 'Bank ABC',
    nullable: true,
  })
  counterAccountBankName?: string | null;

  @ApiProperty({
    description: 'Name of the counter account holder, if available',
    example: 'John Doe',
    nullable: true,
  })
  counterAccountName?: string | null;

  @ApiProperty({
    description: 'Counter account number, if available',
    example: '9876543210',
    nullable: true,
  })
  counterAccountNumber?: string | null;

  @ApiProperty({
    description: 'Virtual account name, if applicable',
    example: 'Virtual Account for Order #1001',
    nullable: true,
  })
  virtualAccountName?: string | null;

  @ApiProperty({
    description: 'Virtual account number, if applicable',
    example: 'VA1234567890',
    nullable: true,
  })
  virtualAccountNumber?: string | null;
}

export class WebhookResponse {
  code: string;
  desc: string;
  success: string;
  data: WebhookDataDto;
}
