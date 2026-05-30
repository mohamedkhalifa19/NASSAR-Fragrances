"use client";
import { Input } from "@/components/ui/input";
import { ILogin } from "../libs/types";
import { intialLoginForm } from "../data";
import { Button } from "@/components/ui/button";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { useState } from "react";

interface IProps {
  form: ILogin;
  setForm: React.Dispatch<React.SetStateAction<ILogin>>;

  errors: Partial<Record<keyof typeof intialLoginForm, string>>;
}
function PasswordInput({ form, setForm, errors }: IProps) {
  const [isShow, setIsShow] = useState(false);
  const toggleShow = () => {
    setIsShow((prev) => !prev);
  };
  return (
    <div className="relative">
      <Input
        id="password"
        type={`${isShow?"text":"password"}`}
        required
        placeholder="كلمة السر "
        value={form.password}
        className={`h-full ${
          errors?.password
            ? "border-red-400 bg-red-50"
            : "border-stone-200 bg-stone-50"
        }`}
        onChange={(e) => {
          setForm((prev) => {
            return { ...prev, password: e.target.value };
          });
        }}
      />{" "}
      <Button
        className="absolute left-0 transform translate-y-full md:-top-1/2 -top-1/3 "
        onClick={toggleShow}
        type="button"
      >
        {!isShow ? (
          <BiSolidShow className="!h-5 !w-5" />
        ) : (
          <BiSolidHide className="!h-5 !w-5" />
        )}
      </Button>
    </div>
  );
}

export default PasswordInput;
