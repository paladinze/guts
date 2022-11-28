
import { User } from './app/models/user';
import { UserForm } from './app/views/UserForm';

const user = User.buildInstance({ name: 'Ze', age: 123, id: 1 });

user.get('name');
user.on('change', () => {
  console.log('change 1');
});
user.on('change', () => {
  console.log('change 2');
});
user.fetch();
// user.set({ 'name': 'ultraman' });

const userCollection = User.buildUserCollection();
userCollection.on('change', () => {
  console.log('Collection data change');
});
userCollection.fetch();


const root = document.getElementById('root')!;
const form = new UserForm(root, user);
form.render();

