import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Slide } from "react-slideshow-image";
import { PageArea, Fake, OthersArea } from './styled';
import useApi from '../../helpers/OlxAPI';
import AdItem from "../../components/partials/AdItem";
import { PageContainer } from '../../components/MainComponents';

const Page = () => {
  const api = useApi();

  const { id } = useParams();
  //alert("ID :"+id);
  const [loading, setLoading] = useState(true);
  const [adInfo, setAdInfo] = useState({});

  useEffect(() => {
    const getAdInfo = async (id) => {
      const json = await api.getAd(id, true);
      //console.log(json);
      setAdInfo(json);
      setLoading(false);
    }
    getAdInfo(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatDate = (date) => {
    let cDate = new Date(date);

    let months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
    let cDay = cDate.getDate();
    let cMonth = cDate.getMonth();
    let cYear = cDate.getFullYear();

    return `${cDay} de ${months[cMonth]} de ${cYear}.`;
  }

  return (
    <PageContainer>
      <PageArea>
        <div className="leftSide">
          <div className="box">
            <div className="adImage">
              {loading && <Fake height={300} />}
              {adInfo.images &&
                <Slide>
                  {adInfo.images.map((img, k) =>
                    <div key={k} className="each-slide">
                      <img src={img} alt="" />
                    </div>
                  )}
                </Slide>
              }
            </div>
            <div className="adInfo">
              <div className="adName">
                {loading && <Fake height={20} />}
                {adInfo.title &&
                  <h2>{adInfo.title}</h2>
                }
                {adInfo.dateCreated &&
                  <small>Criado em {formatDate(adInfo.dateCreated)}</small>
                }
              </div>
              <div className="adDescription">
                {loading && <Fake height={100} />}
                {adInfo.description}
                <hr />
                {adInfo.views &&
                  <small>Visualizações: {adInfo.views}</small>
                }
              </div>
            </div>
          </div>
        </div>
        
        <div className="rightSide">
          <div className="box box--padding">
            {loading && <Fake height={20} />}
            {adInfo.priceNegotiable &&
              "Preço Negociável"
            }
            {!adInfo.priceNegotiable && adInfo.price &&
              <div className="price">
                Preço: <span>R$ {adInfo.price}</span>
              </div>
            }
          </div>

          {loading && <Fake height={50} />}
          {adInfo.userInfo &&
            <>
              <a href={`${adInfo.userInfo.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contactSellerLink"
              >
                Fale com o vendedor
              </a>
              <div className="createdBy box box--padding">
                <strong>{adInfo.userInfo.name}</strong>
                <small>E-mail: {adInfo.userInfo.email}</small>
                <small>Estado: {adInfo.stateName}</small>
              </div>
            </>
          }
        </div>
      </PageArea>

      <OthersArea>
        {adInfo.others &&
          <>
            <h2>Outras ofertas do vendedor</h2>
            <div className="list">
              {adInfo.others.map((i,k) => 
                <AdItem key={k} data={i} />
              )}
            </div>
          </>          
        }
      </OthersArea>

    </PageContainer>
  );
}

export default Page;