import { Outlet } from 'react-router-dom';
import { Header } from '../../components/Header';
export const Layout = () => {

  return (
    <>
      <nav>
        <Header />
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
};