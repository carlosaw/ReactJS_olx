import React from "react";
import { PageArea } from "./styled";
import { PageContainer } from '../../components/MainComponents';
const MAX_ITEMS = 9;
const MAX_LEFT = (MAX_ITEMS - 1) / 2;

const Pagination = ({ limit, total, offset, setOffset}) => {
  const current = offset ? (offset / limit) + 1 : 1;
  // eslint-disable-next-line
  const pages = Math.ceil(total / limit);
  const first = Math.max(current - MAX_LEFT, 1);

  const onPageChange = (page) => {
    setOffset((page - 1) * limit);
  }

  return (
    <PageContainer>
      <PageArea>
        
          <ul className="pagination">
            <div className="preview">
              <button 
                onClick={() => 
                onPageChange(current - 1)}
                disabled={current === 1}
              >
                Anterior
              </button>
            </div>
            {Array.from({ length: MAX_ITEMS})
              .map((_, index) => index + first)
              .map((page) => (
              <li key={page}>
                <button 
                  onClick={() => onPageChange(page)}
                  className={page === current ? 'active' : ''}
                >
                  {page}
                </button>              
              </li>
            ))}
            <div className="next">
              <button 
                onClick={() => 
                onPageChange(current + 1)}
                disabled={current === pages}
              >
                Próxima
              </button>
            </div>
          </ul>
              
      </PageArea>
    </PageContainer>
    
  );
}

export default Pagination;