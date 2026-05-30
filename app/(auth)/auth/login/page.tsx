"use client";
import { login } from "@/app/actions/admin.actions";
import PasswordInput from "@/app/components/PasswordInput";
import { intialLoginForm } from "@/app/data";
import { ILogin } from "@/app/libs/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function page() {
  const [form, setForm] = useState<ILogin>(intialLoginForm);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof intialLoginForm, string>>
  >({});
  const validate = () => {
    const newErrors: typeof errors = {};
    if (!form.password.trim()) newErrors.password = "كلمة السر مطلوبة";
    if (
      !form.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
    )
      newErrors.email = "ادخل الإيميل بشكل صحيح";
    return newErrors;
  };
  const reset = () => {
    setForm(intialLoginForm);
    setErrors({});
  };
  const handleSubmit = async () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setLoading(true);
    try {
      const user = await login(form);
      router.refresh();
      router.push("/dashboard/perfumes");
      toast(
        <p className="flex items-center text-green-500 font-almarai text-[15px] tracking-widest">
          تم التسجيل الدخول بالنجاح{" "}
        </p>,
        { style: { background: "black", opacity: 0.9 } },
      );
      reset();
    } catch (error) {
      toast(
        <p className="flex items-center text-red-500 font-almarai text-[15px] tracking-widest">
          كلمة السر او الإيميل غير صحيح
        </p>,
        { style: { background: "black", opacity: 0.9 } },
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Card className="w-full bg-white z-10 max-w-sm   absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <CardHeader className="text-center">
          <CardTitle className="font-cairo text-lg font-bold text-center">
            سجل الدخول للوحة التحكم
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6 mt-2">
              <div className="grid gap-2 font-almarai font-semibold h-14 md:h-12">
                <Input
                  type="email"
                  value={form.email}
                  placeholder="الإيميل الخاص بك"
                  required
                  className={`h-full ${
                    errors?.password
                      ? "border-red-400 bg-red-50"
                      : "border-stone-200 bg-stone-50"
                  }`}
                  onChange={(e) => {
                    setForm((prev) => {
                      return { ...prev, email: e.target.value };
                    });
                  }}
                />
                {errors?.email && (
                  <p className="text-xs text-red-500 font-cairo">
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="grid gap-2 h-14 md:h-12 font-semibold  font-almarai">
                <PasswordInput errors={errors} form={form} setForm={setForm} />
                {errors?.password && (
                  <p className="text-xs text-red-500 font-cairo">
                    {errors.password}
                  </p>
                )}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className="font-almarai font-bold text-white text-lg w-full border bg-indigo-600 hover:bg-indigo-500 h-16"
            variant={"default"}
            onClick={handleSubmit}
            disabled={loading}
          >
            تسجيل الدخول
            {loading && <Spinner />}
          </Button>
        </CardFooter>
      </Card>
      <div className="fixed w-full h-full inset-0 bg-black/70 z-5"></div>
    </>
  );
}
