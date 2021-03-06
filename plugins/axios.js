import jwtDecode from "jwt-decode";
import { tokenExpired } from "@/lib/jwt";

export default function(all) {
  const {
    $axios,
    app: { $cookies, store, $repositories }
  } = all;

  $axios.onRequest(async config => {
    try {
      if (config.url.includes("/auth/refresh")) {
        return config;
      }

      const token = $cookies.get("token");

      if (!token) {
        return config;
      }

      const userPayload = jwtDecode(token);
      const isTokenExpired = tokenExpired(userPayload.exp);

      if (!isTokenExpired) {
        config.headers.common["Authorization"] = `Bearer ${token}`;
        return config;
      }

      const refreshToken = $cookies.get("refreshToken");
      const { sub: userId } = userPayload;

      const resRefreshToken = await $repositories.auth.refreshToken({
        refreshToken,
        user: userId
      });

      await Promise.all([
        store.dispatch("setToken", resRefreshToken.body.token),
        store.dispatch("setRefreshToken", resRefreshToken.body.refreshToken)
      ]);

      console.log("token: refresh");
    } catch (error) {
      console.log("$axios.onRequest: error", error);
    }

    return config;
  });
}
