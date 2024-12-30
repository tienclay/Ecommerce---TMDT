// src/interface/event-types.interface.ts

export interface EventPayloads {
  'user.welcome': { name: string; email: string };
  'user.reset-password': { name: string; email: string; link: string };
  'user.verify-email': { name: string; email: string; otp: string };
  'order.success': {
    orderId: string;
    name: string;
    email: string;
  };
  'order.cancel': {
    orderId: string;
    name: string;
    email: string;
    items: Array<{ name: string; quantity: number; price: number }>;
    total: number;
  };
}
