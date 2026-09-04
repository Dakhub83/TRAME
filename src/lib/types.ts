export type SeatColumn = "A" | "B" | "D";

export type SeatStatus = "available" | "taken";

export type Seat = {
  id: string;
  row: number;
  column: SeatColumn;
  vip: boolean;
  status: SeatStatus;
};

export type Trip = {
  id: string;
  fromCity: string;
  fromDetail: string;
  toCity: string;
  toDetail: string;
  date: string;
  departure: string;
  duration: string;
  direct: boolean;
  coachModel: string;
  coachCode: string;
  seatCount: number;
  vipPrice: number;
  standardPrice: number;
  seats: Seat[];
};

export type PaymentMethod = "orange" | "moov";

export type Booking = {
  trip: Trip;
  seat: Seat;
  pnr: string;
  paymentMethod: PaymentMethod;
  createdAt: number;
};
