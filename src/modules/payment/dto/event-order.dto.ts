// orderId: string;
// name: string;
// email: string;
// items: Array<{ name: string; quantity: number; price: number }>;
// total: number;
export class ItemDto {
  name: string;
  quantity: number;
  price: number;
}
export class EventOrderDto {
  orderId: string;
  name: string;
  email: string;
  items: ItemDto;
  total: number;
}
