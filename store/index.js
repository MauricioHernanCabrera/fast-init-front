import { get } from "lodash";

const cookieparser = process.server ? require("cookieparser") : undefined;

export const state = () => ({
  user: null,

  dashboardDrawerOpen: null,

  locales: ["en", "es"],

  locale: "es"
});

export const getters = {
  isAuth: ({ user }) => {
    return user !== null && user._id !== null;
  }
};

export const mutations = {
  SET_USER: (state, payload) => {
    state.user = payload;
  },

  UPDATE_USER: (state, payload) => {
    state.user = { ...state.user, ...payload };
  },

  SET_DASHBOARD_DRAWER_OPEN: (state, payload) => {
    state.dashboardDrawerOpen = payload;
  }
};

export const actions = {
  setUser({ commit }, payload) {
    commit("SET_USER", payload);
  },

  updateUser({ commit }, payload) {
    commit("UPDATE_USER", payload);
  },

  setDashboardDrawerOpen({ commit }, payload) {
    commit("SET_DASHBOARD_DRAWER_OPEN", payload);
  },

  async setToken({}, token) {
    const myDate = new Date();
    const expires1Day = new Date(myDate.setDate(myDate.getDate() + 1));

    this.$cookies.set("token", token, {
      path: "/",
      expires: expires1Day
    });

    this.$axios.setToken(token, "Bearer");
  },

  async setRefreshToken({}, refreshToken) {
    const myDate = new Date();
    const expires90Day = new Date(myDate.setDate(myDate.getDate() + 90));

    this.$cookies.set("refreshToken", refreshToken, {
      path: "/",
      expires: expires90Day
    });
  },

  async removeToken({}) {
    this.$cookies.remove("token");
    this.$axios.setToken(null, "Bearer");
  },

  async removeRefreshToken({}) {
    this.$cookies.remove("refreshToken");
  },

  async logout({ dispatch, commit }) {
    const refreshToken = this.$cookies.get("refreshToken");

    try {
      await this.$repositories.auth.logout({ refreshToken });
    } catch (error) {}

    await Promise.all([
      dispatch("removeToken"),
      dispatch("removeRefreshToken")
    ]);

    dispatch("setUser", null);
    this.$router.push("/login");
  },

  async loadUserData({ dispatch }) {
    const resUser = await this.$repositories.user.getProfile();

    dispatch("setUser", resUser.body);
  },

  async nuxtServerInit({ dispatch }, { req }) {
    try {
      const { token } = cookieparser.parse(req.headers.cookie);

      if (!token) {
        return;
      }

      await dispatch("setToken", token);
      await dispatch("loadUserData");

      console.log("token: valid");
    } catch (error) {
      await Promise.all([
        dispatch("removeToken"),
        dispatch("removeRefreshToken")
      ]);
      console.log("token: death");
    }
  }
};
