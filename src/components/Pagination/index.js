import React from "react";
import { PageArea } from "./styled";
import { PageContainer } from '../../components/MainComponents';
import Next from '../../assets/images/arrowNext.png';
import Prev from '../../assets/images/arrowPrev.png';

const MAX_ITEMS = 9;
const MAX_LEFT = (MAX_ITEMS - 1) / 2;

const Pagination = ({ limit, total, offset, setOffset}) => {
  const current = offset ? (offset / limit) + 1 : 1;
 
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
                <img src={Prev} alt="" />
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
                <img src={Next} alt="" />
              </button>
            </div>
          </ul>
              
      </PageArea>
    </PageContainer>
    
  );
}

export default Pagination;