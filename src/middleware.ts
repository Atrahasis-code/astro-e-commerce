import { defineMiddleware } from "astro:middleware";
import { supabase } from "@/lib/supabase";

export const onRequest = defineMiddleware(async (context, next) => {
  const accessToken = context.cookies.get("sb-access-token");
  const refreshToken = context.cookies.get("sb-refresh-token");

  if (!accessToken || !refreshToken) {
    context.locals.user = null;
    return next();
  }

  const { data, error } = await supabase.auth.setSession({
    access_token: accessToken.value,
    refresh_token: refreshToken.value,
  });

  if (error) {
    context.cookies.delete("sb-access-token", { path: "/" });
    context.cookies.delete("sb-refresh-token", { path: "/" });
    context.locals.user = null;
    return next();
  }

  context.locals.user = data.user;
  return next();
});
