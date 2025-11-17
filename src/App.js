import logo from './logo.svg';
import './App.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRouter from './router/appRouter';
import Header from './component/ui/header';
import SidebarLayout from './router/sidebar/sidebar';

export default function App() {
  return (
    <>
      <AppRouter />
      <ToastContainer position="top-right" autoClose={2500} />
    </>
  );
}
