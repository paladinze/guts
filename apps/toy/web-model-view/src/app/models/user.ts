import { Model } from './model';
import { Attributes } from './attributes';
import { Sync } from './sync';
import { Events } from './events';
import { Collection } from './collection';

export interface UserProps {
  id: number;
  name: string;
  age: number;
}

export class User extends Model<UserProps> {

  static buildInstance(attrs: UserProps) {
    return new User(
      new Attributes<UserProps>(attrs),
      new Events(),
      new Sync<UserProps>('http://localhost:3000/users')
    );
  }

  static buildUserCollection() {
    return new Collection('http://localhost:3000/users', User.buildInstance);
  }

}