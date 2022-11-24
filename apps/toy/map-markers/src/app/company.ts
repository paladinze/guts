import { faker } from '@faker-js/faker';

export default class Company {
  name: string;
  description: string;
  location: {
    lat: number;
    lng: number;
  };

  constructor() {
    this.name = faker.company.name();
    this.description = `Main product: ${faker.company.catchPhrase()}`;
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude())
    };
  }

}
