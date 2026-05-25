import { supabase } from "../libs/supabase";
import { ILogin } from "../libs/types";

export const login = async (form: ILogin) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: form.email,
    password: form.password,
  });

  if (error) throw new Error(error.message);
  if (!data.user) throw new Error("حدث خطأ غير متوقع");
  console.log(data.user, data.session);
  return data.user;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  return error;
};
