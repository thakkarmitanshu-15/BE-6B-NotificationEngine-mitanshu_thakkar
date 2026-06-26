export interface DeliveryProvider {

  send(
    recipient: string,
    subject: string,
    message: string
  ): Promise<void>;

  healthCheck(): Promise<boolean>;
}