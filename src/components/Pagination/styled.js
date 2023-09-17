import styled from 'styled-components';

export const PageArea = styled.div`

.pagination {
  display: flex;
  list-style: none;

  .active {
    border-bottom: 2px solid green;
  }

  .preview,
  .next {    
    button {
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #EEE;
      cursor: pointer;
      border: 0;
      color: #333;
      border-radius: 3px;

      img {
        width: 12px;
        opacity: 0.5;
        margin: 0px 10px;
      }
      
      &:hover {
        background-color: #dbdbdb;
      }
    }   
  }

  li {
    margin: 0px 5px;

    button {
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #EEE;
      cursor: pointer;
      border: 0;
      color: #333;
      font-size: 15px;

      &:hover {
        background-color: #dbdbdb;
      }
    }
  }
}

  /* .listPage {
    display: flex;
    justify-content: center;
    align-items: center;

    .active {
      border-color: green;
    }

    ul {
      display: flex;
      list-style: none;

      li {
        margin-left: 1rem;

        button {
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #EEE;
          cursor: pointer;
          border: 1px solid #CCC;
          color: #333;

          &:hover {
            border: 1px solid green;
          }
        }      
      }
    }
  } */
  
`;