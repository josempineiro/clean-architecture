export interface Event<Payload = unknown> {
  type: string;
  payload: Payload
}