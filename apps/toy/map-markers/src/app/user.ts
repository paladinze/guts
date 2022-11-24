import { faker } from '@faker-js/faker';
import { Markable } from '../interface/markable';

export default class User implements Markable {
  name: string;
  description: string;
  location: {
    lat: number;
    lng: number;
  };

  constructor() {
    this.name = faker.name.firstName();
    this.description = `Role: ${faker.name.jobTitle()}`;
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude())
    };
  }

}
