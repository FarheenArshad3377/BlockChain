import { FaSearch } from 'react-icons/fa';
const Header = ()=> {
  return (
    <nav className="navbar navbar-expand-lg header-design">
      <div className="container-fluid justify-content-center text-color">
        <div className="d-flex align-items-center gap-4 flex-wrap">
          
          {/* Logo / Brand */}
          <a className="navbar-brand text-color" href="#">Navbar</a>
          
          {/* Collapse button */}
          <button 
            className="navbar-toggler text-color" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarSupportedContent" 
            aria-controls="navbarSupportedContent" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Links + Search */}
          <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
            
            {/* Links */}
            <ul className="navbar-nav d-flex flex-row gap-3 mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active text-color" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-color" href="#">Link</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-color" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item text-color" href="#">Action</a></li>
                  <li><a className="dropdown-item text-color" href="#">Another action</a></li>
                  <li><hr className="dropdown-divider"/></li>
                  <li><a className="dropdown-item text-color" href="#">Something else here</a></li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled text-color" aria-disabled="true">Disabled</a>
              </li>
            </ul>

            {/* Search */}
            <FaSearch/>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
