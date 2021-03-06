import CrudRepository from "crud-repository";

export default class UserRepository extends CrudRepository {
  constructor({ $axios }) {
    super({ $axios, resource: "/users", includes: [] });
  }

  getProfile = () => {
    return this.$axios.$get(`${this.resource}/profile`);
  };
}
