import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { PageArea } from './styled';
import useApi from '../../helpers/OlxAPI';

import { PageContainer } from '../../components/MainComponents';

import AdItem from '../../components/partials/AdItem';
import Pagination from '../../components/Pagination';
let timer;

const Page = () => {
  const api = useApi();
  const history = useHistory();
  const LIMIT = 6;
  
  const useQueryString = () => {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQueryString();
 
  // Pesquisa
  const [q, setQ] = useState(query.get('q') != null ? query.get('q') : '');
  const [cat, setCat] = useState(query.get('cat') != null ? query.get('cat') : '');
  const [state, setState] = useState(query.get('state') != null ? query.get('state') : '');
  
  // Pega listas
  const [adsTotal, setAdsTotal] = useState(0);
  const [stateList, setStateList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [adList, setAdList] = useState([]);

  // Paginação
  
  const [offset, setOffset] = useState(0);

  // Loading e opacidade
  const [resultOpacity, setResultOpacity] = useState(1);
  const [loading, setLoading] = useState(false);

  // Pega lista de anúncios
  const getAdsList = async () => {
    setLoading(true);
    const json = await api.getAds({
      sort: 'desc',
      limit: LIMIT,
      q,
      cat,
      state,
      offset
    });
    setAdList(json.ads);
    setAdsTotal(json.total);
    setResultOpacity(1);
    setLoading(false);
  }

  // Monitora opacidade
  useEffect(()=>{
    setResultOpacity(0.3);
    getAdsList();
    // eslint-disable-next-line
  }, []);

  // Para mudar a query no browser
  useEffect(() => {
    let queryString = [];
    if (q) {
      queryString.push(`q=${q}`);
    }
    if (cat) {
      queryString.push(`cat=${cat}`);
    }
    if (state) {
      queryString.push(`state=${state}`);
    }
    history.replace({
      search: `?${queryString.join('&')}`
    });
    if(timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(getAdsList, 2000);
    setResultOpacity(0.3);
    // eslint-disable-next-line
  }, [q, cat, state, offset]);

  // Monitora mudanças em estado
  useEffect(() => {
    const getStates = async () => {
      const slist = await api.getStates();
      setStateList(slist);
    }
    getStates();
    setOffset(0);
    // eslint-disable-next-line
  }, [state]);

  // Monitora mudanças em categorias
  useEffect(() => {
    const getCategories = async () => {
      const cats = await api.getCategories();
      setCategories(cats);
    }
    getCategories();
    setOffset(0);
    // eslint-disable-next-line
  }, [cat]);

  return (
    <PageContainer>
      <PageArea>
        
        <div className="leftSide">
          <form method="GET">
            <input
              type="text"
              name="q"
              placeholder="O que você procura?"
              value={q}
              onChange={e => setQ(e.target.value)}
            />

            <div className="filterName">Estado:</div>
            <select name="state" value={state} onChange={e => setState(e.target.value)}>
              <option></option>
              {stateList.map((i, k) =>
                <option key={k} value={i.name}>{i.name}</option>
              )}
            </select>

            <div className="filterName">Categoria:</div>
            <ul>
              {categories.map((i, k) =>
                <li
                  key={k}
                  className={cat === i.slug ? 'categoryItem active' : 'categoryItem'}
                  onClick={() => setCat(i.slug)}
                >
                  <img src={i.img} alt="" />
                  <span>{i.name}</span>
                </li>
              )}
            </ul>
          </form>
        </div>
        <div className="rightSide">
          <h2>Resultados</h2>

          {loading && adList.length === 0 &&
            <div className='listWarning'>Carregando...</div>
          }
          {!loading && adList.length === 0 &&
            <div className='listWarning'>Não encontramos nenhum resultado!</div>
          }
          <div className='list' style={{opacity:resultOpacity}}>
            {adList.map((i,k) => 
              <AdItem key={k} data={i} />
            )}
          </div>
          
          {adsTotal &&
            <div  className="paginationPg">
              <Pagination 
                limit={LIMIT} 
                total={setAdsTotal} 
                offset={offset}
                setOffset={setOffset}
              />
            </div>            
          }

        </div>
      </PageArea>
    </PageContainer>
  );
}

export default Page;