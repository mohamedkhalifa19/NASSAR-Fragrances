"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export default function NetworkToast() {
  useEffect(() => {
    const handleOffline = () => {
      toast(
        <p className="font-tajawal">
          لا يوجد اتصال بالإنترنت. يرجى التحقق من الشبكة.
        </p>,
        {
          style: { background: "red", opacity: 0.9, color: "white" },
          position: "bottom-right",
        },
      );
    };

    const handleOnline = () => {
      toast(<p className="font-tajawal">تم استعادة الاتصال بالإنترنت!</p>, {
        style: { background: "green", opacity: 0.9, color: "white" },
        position: "bottom-right",
      });
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    // initial check
    if (!navigator.onLine) {
      handleOffline();
    }

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  return null;
}
