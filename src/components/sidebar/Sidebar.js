import React from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { PropTypes } from "prop-types";
import PerfectScrollbar from "perfect-scrollbar";
import { Nav, NavLink as ReactstrapNavLink } from "reactstrap";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";

var ps;

function Sidebar(props) {
  const location = useLocation();
  const sidebarRef = React.useRef(null);
  const [activeDropdown, setActiveDropdown] = React.useState(null);

  const activeRoute = (routeName) => {
    return location.pathname === routeName ? "active" : "";
  };

  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebarRef.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });
  const linkOnClick = () => {
    document.documentElement.classList.remove("nav-open");
  };
  const { routes, rtlActive, logo } = props;
  let logoImg = null;
  let logoText = null;
  if (logo !== undefined) {
    if (logo.outterLink !== undefined) {
      logoImg = (
        <a
          href={logo.outterLink}
          className="simple-text logo-mini"
          target="_blank"
          onClick={props.toggleSidebar}
          rel="noreferrer"
        >
          <div className="logo-img">
            <img src={logo.imgSrc} alt="react-logo" />
          </div>
        </a>
      );
      logoText = (
        <a
          href={logo.outterLink}
          className="simple-text logo-normal"
          target="_blank"
          onClick={props.toggleSidebar}
          rel="noreferrer"
        >
          {logo.text}
        </a>
      );
    } else {
      logoImg = (
        <Link
          to={logo.innerLink}
          className="simple-text logo-mini"
          onClick={props.toggleSidebar}
        >
          <div className="logo-img">
            <img src={logo.imgSrc} alt="react-logo" />
          </div>
        </Link>
      );
      logoText = (
        <Link
          to={logo.innerLink}
          className="simple-text logo-normal"
          onClick={props.toggleSidebar}
        >
          {logo.text}
        </Link>
      );
    }
  }
  return (
    <BackgroundColorContext.Consumer>
      {({ color }) => (
        <div className="sidebar" data={color}>
          <div className="sidebar-wrapper" ref={sidebarRef}>
            {logoImg !== null || logoText !== null ? (
              <div className="logo">
                {logoImg}
                {logoText}
              </div>
            ) : null}
            <Nav>
              {routes.map((prop, key) => {
                if (prop.redirect) return null;

                const isActiveDropdown = activeDropdown === prop.name;
                return (
                  <li key={key} className={isActiveDropdown ? "active" : ""}>
                    <NavLink
                      to={prop.layout + prop.path}
                      className="nav-link"
                      onClick={() =>
                        setActiveDropdown(isActiveDropdown ? null : prop.name)
                      }
                    >
                      <i className={prop.icon} />
                      <p>{rtlActive ? prop.rtlName : prop.name}</p>
                    </NavLink>
                    {prop.subItems && (
                      <Nav
                        className={`nav${isActiveDropdown ? "" : " d-none"}`}
                      >
                        {prop.subItems.map((subProp, subKey) => (
                          <li
                            key={subKey}
                            className={
                              activeRoute(subProp.layout + subProp.path) +
                              (subProp.pro ? " active-pro" : "")
                            }
                          >
                            <NavLink
                              to={subProp.layout + subProp.path}
                              className="nav-link"
                              onClick={props.toggleSidebar}
                            >
                              <p>
                                {rtlActive ? subProp.rtlName : subProp.name}
                              </p>
                            </NavLink>
                          </li>
                        ))}
                      </Nav>
                    )}
                  </li>
                );
              })}
              {/* <li className="active-pro">
                <ReactstrapNavLink href="https://www.creative-tim.com/product/black-dashboard-pro-react?ref=bdr-user-archive-sidebar-upgrade-pro">
                  <i className="tim-icons icon-spaceship" />
                  <p>Upgrade to PRO</p>
                </ReactstrapNavLink>
              </li> */}
            </Nav>
          </div>
        </div>
      )}
    </BackgroundColorContext.Consumer>
  );
}

Sidebar.propTypes = {
  rtlActive: PropTypes.bool,
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    innerLink: PropTypes.string,
    outterLink: PropTypes.string,
    text: PropTypes.node,
    imgSrc: PropTypes.string,
  }),
};

export default Sidebar;
