import { useSelector } from "react-redux";
import { LogoutBtn, Container, Logo } from "../";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const authStatus = useSelector((state) => state.authReducer.status);

  const navItems = [
    {
      name: "Home",
      path: "/",
      active: true,
    },
    {
      name: "Login",
      path: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      path: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      path: "/posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      path: "/add-post",
      active: authStatus,
    },
  ];

  function handleResize() {
    setWindowWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="p-3 sticky top-0 w-full flex justify-between items-center shadow bg-gray-500">
      <Container className="max-sm:pl-0 pl-4">
        <nav className="flex sm:justify-between w-full justify-center">
          {windowWidth > 640 && (
            <div className="mr-4">
              <NavLink to="/">
                <Logo width="70px" />
              </NavLink>
            </div>
          )}
          <ul className="flex sm:justify-between gap-4 max-sm:gap-1 max-sm:px-0 px-4 items-center">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <NavLink
                      className={({ isActive }) =>
                        `inline-bock max-sm:px-4 max-[400px]:px-2 px-6 py-2 duration-200 hover:bg-blue-100  text-center rounded-full ${
                          isActive ? "bg-blue-100" : ""
                        }`
                      }
                      to={item.path}
                    >
                      {item.name}
                    </NavLink>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
