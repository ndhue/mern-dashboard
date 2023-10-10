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
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
