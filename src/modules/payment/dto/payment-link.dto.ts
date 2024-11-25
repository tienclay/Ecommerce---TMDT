import { ApiProperty } from '@nestjs/swagger';
export class TransactionType {
  reference: string;
  amount: number;
  accountNumber: string;
  description: string;
  transactionDateTime: string;
  virtualAccountName: string | null;
  virtualAccountNumber: string | null;
  counterAccountBankId: string | null;
  counterAccountBankName: string | null;
  counterAccountName: string | null;
  counterAccountNumber: string | null;
}
export class PaymentLinkDto {
  @ApiProperty({
    description: 'Unique identifier for the payment link',
    example: 'abc123',
  })
  id: string;

  @ApiProperty({
    description: 'Order code associated with the payment link',
    example: 1001,
  })
  orderCode: number;

  @ApiProperty({ description: 'Total amount for the payment', example: 5000 })
  amount: number;

  @ApiProperty({ description: 'Amount already paid', example: 2000 })
  amountPaid: number;

  @ApiProperty({ description: 'Remaining amount to be paid', example: 3000 })
  amountRemaining: number;

  @ApiProperty({
    description: 'Current status of the payment link',
    example: 'Pending',
    enum: ['Pending', 'Completed', 'Canceled'],
  })
  status: string;

  @ApiProperty({
    description: 'Creation timestamp of the payment link',
    example: '2024-11-25T14:30:00.000Z',
  })
  createdAt: string;

  @ApiProperty({
    description: 'List of transactions associated with the payment link',
    type: [TransactionType], // Reference your transaction type DTO or interface
  })
  transactions: TransactionType[];

  @ApiProperty({
    description: 'Reason for cancellation, if applicable',
    example: 'Customer requested cancellation',
    nullable: true,
  })
  cancellationReason: string | null;

  @ApiProperty({
    description:
      'Timestamp of when the payment link was canceled, if applicable',
    example: '2024-11-26T10:00:00.000Z',
    nullable: true,
  })
  canceledAt: string | null;
}
