import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Layout } from "@/pages/layout";
import { Dashboard } from "@/pages/dashboard";
import { Products } from "./pages/products";
import { Customers } from "./pages/customers";
import { Transactions } from "./pages/transactions";
import { Geography } from "./pages/geography";
import { Overview } from "./pages/overview";
import { Daily } from "./pages/daily";
import { Monthly } from "./pages/monthly";
import { Breakdown } from "./pages/breakdown";
import { Admin } from "./pages/admin";
import { Performance } from "./pages/performance";

function App() {
  

  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        { path: "/", element: <Navigate to="/dashboard" replace /> },
        { path: "/dashboard", element: <Dashboard /> },
        { path: "/products", element: <Products /> },
        { path: "/customers", element: <Customers /> },
        { path: "/transactions", element: <Transactions /> },
        { path: "/geography", element: <Geography /> },
        { path: "/overview", element: <Overview /> },
        { path: "/daily", element: <Daily /> },
        { path: "/monthly", element: <Monthly /> },
        { path: "/breakdown", element: <Breakdown /> },
        { path: "/admin", element: <Admin /> },
        { path: "/performance", element: <Performance /> },
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
