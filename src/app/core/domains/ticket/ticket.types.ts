import { VehicleResponse } from '../vehicle/vehicle.types';

export interface TicketRequest {
  plate: string;
  model: string;
  color: string;
  clientId?: string;
}

export interface TicketResponse {
  id: string;
  companyId: string;
  vehicle: VehicleResponse;
  partnershipId?: string;
  enteredAt: string;
  exitedAt?: string;
  status: string;
  totalAmount?: number;
}

export interface ApplyPartnershipParams {
  id: string;
  partnershipId: string;
}
