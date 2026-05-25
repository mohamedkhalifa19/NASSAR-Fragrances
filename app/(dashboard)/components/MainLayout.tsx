"use client";
import { ReactNode, useState } from "react";
import DashboardSidebar from "@/app/components/DashboardSidebar";
import { IoMdMenu } from "react-icons/io";
import Modal from "./Modal";
import ShowProduct from "./ShowProduct";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";
import AddProduct from "./AddNewPerfume";
import AddOffer from "./AddNewOffer";
import EditPerfume from "./EditOffer";
import EditOffer from "./EditOffer";
import DeleteOffer from "./DeleteOffer";
import ShowOffer from "./ShowOffer";
import AddNewPerfume from "./AddNewPerfume";
import AddNewNews from "./AddNewNews";
import ShowNew from "./ShowNew";
import DeleteNew from "./DeleteNew";
import EditNew from "./EditNew";
import { Toaster } from "@/components/ui/sonner";
interface IProps {
  children: ReactNode;
}
function MainLayout({ children }: IProps) {
  const [isDashboardSidebarOpen, setIsDashboardSidebarOpen] = useState(false);
  const openDashboard = () => setIsDashboardSidebarOpen(true);
  const closeDashboard = () => setIsDashboardSidebarOpen(false);

  return (
    <div>
      <main className="overflow-hidden lg:mr-[25%] md:mr-[34%]">
        {children}
      </main>
      {/* Desktop */}
      <div className="hidden md:block">
        <DashboardSidebar closeDashboard={closeDashboard} />
      </div>
      {/* Mobile */}
      <button
        className="sm:block md:hidden absolute top-1 left-2 p-4"
        onClick={openDashboard}
      >
        <IoMdMenu className="text-4xl" />
      </button>
      {isDashboardSidebarOpen && (
        <DashboardSidebar closeDashboard={closeDashboard} />
      )}
      {/* Perfume actions */}
      {/* Add product */}
      <AddNewPerfume />
      {/* Show Product */}
      <ShowProduct />
      {/* Edit Product */}
      <EditProduct />
      {/* Delete Product */}
      <DeleteProduct />
      {/* Offer actions */}
      {/* Add product */}
      <AddOffer />
      {/* Show Product */}
      <ShowOffer />
      {/* Edit Product */}
      <EditOffer />
      {/* Delete Product */}
      <DeleteOffer />
      {/* Add News */}
      <AddNewNews />
      {/* Show New */}
      <ShowNew />
      {/* Edit New */}
      <EditNew />
      {/* Delete New */}
      <DeleteNew />
      <Toaster />
    </div>
  );
}

export default MainLayout;
