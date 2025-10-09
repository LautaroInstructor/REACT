import Header from '../layout/Header'
import Footer from '../layout/Footer'
import { Outlet } from 'react-router-dom'; 
function Layout({ children }) {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
export default Layout;

