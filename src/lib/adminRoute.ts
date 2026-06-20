export const ADMIN_BASE_PATH = "/bss-command-7x4q9";
export const ADMIN_SIGN_IN_PATH = `${ADMIN_BASE_PATH}/signin`;
export const ADMIN_OWNER_EMAIL = "admin@bss.com.pk";

export function adminPath(path = "") {
  return path ? `${ADMIN_BASE_PATH}/${path}` : ADMIN_BASE_PATH;
}
