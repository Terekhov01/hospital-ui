export class Service {
  id: bigint;
  serviceName: string;
  constructor(serviceName: string) {
    this.serviceName = serviceName;
  }

  toString(): string
  {
    return this.serviceName;
  }

}
