import React from 'react';
import { Link } from 'react-router-dom';
import { HeaderArea } from './styled';
import { isLogged, doLogout } from '../../../helpers/authHandler';

const Header = () => {
  let logged = isLogged();

  const handleLogout = () => {
    doLogout();
    window.location.href = '/';
  }

  return (
    <HeaderArea>
      <div className='container'>
        <div className='logo'>
          <Link to="/">
            <span className='logo-1'>A</span>
            <span className='logo-2'>W</span>
            <span className='logo-3'>2</span>
            <span className='logo-3'> - Classificados</span>
          </Link>
        </div>

        <nav>
          <ul>
            {logged &&
              <>
              <div className='mylogout'>
              <li>
                  <Link to="/my-account">Minha conta</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Sair</button>
                </li>
              </div>
                
                <li>
                  <Link to="/post-an-ad" className="button">Poste um anúncio</Link>
                </li>
              </>
            }

            {!logged &&
              <>
                <li>
                  <Link to="/signin">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Cadastrar</Link>
                </li>
                <li>
                  <Link to="/signin" className="button">Poste um anúncio</Link>
                </li>
              </>
            }
          </ul>
        </nav>

      </div>
    </HeaderArea>
  );
}

export default Header;