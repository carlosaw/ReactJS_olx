import React from "react";
import { PageArea } from "./styled";
import { PageContainer } from '../../components/MainComponents';
const MAX_ITEMS = 9;
const MAX_LEFT = (MAX_ITEMS - 1) / 2;

const Pagination = ({ limit, total, offset, setOffset}) => {
  const current = offset ?(offset / limit) + 1 : 1;
  // eslint-disable-next-line
  const pages = Math.ceil(total / limit);
  const first = Math.max(current - MAX_LEFT, 1);

  return (
    <PageContainer>
      <PageArea>
        
          <ul className="pagination">
            {Array.from({ length: MAX_ITEMS})
              .map((_, index) => index + first)
              .map((page) => (
              <li key={page}>
                <button 
                  onClick={() => setOffset((page - 1) * limit)}
                  className={page === current ? 'active' : ''}
                >
                  {page}
                </button>              
              </li>
            ))}
          </ul>
              
      </PageArea>
    </PageContainer>
    
  );
}

export default Pagination;