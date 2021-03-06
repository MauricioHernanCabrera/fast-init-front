import CrudRepository from "crud-repository";

export default class AuthRepository extends CrudRepository {
  constructor({ $axios }) {
    super({ $axios, resource: "/auth", includes: [] });
  }

  logout = payload => {
    return this.$axios.$post(`${this.resource}/logout`, payload);
  };

  refreshToken = payload => {
    return this.$axios.$post(`${this.resource}/refresh`, payload);
  };
}
