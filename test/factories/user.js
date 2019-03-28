import faker from 'faker';
import models from '../../models';

const data = async (props = {}) => {
  const defaultProps = {
    email: faker.internet.email(),
    name: faker.name.firstName(),
    password: faker.internet.password(),
  };
  return Object.assign({}, defaultProps, props);
};

export default async (props = {}) =>
  models.User.create(await data(props));