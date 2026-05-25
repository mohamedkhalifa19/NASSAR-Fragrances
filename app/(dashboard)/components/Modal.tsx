import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  isOpen: boolean;
}
function Modal({ children, isOpen }: IProps) {
  return (
    <AlertDialog open={isOpen} >
      <AlertDialogContent className="bg-white ">{children}</AlertDialogContent>
    </AlertDialog>
  );
}

export default Modal;
