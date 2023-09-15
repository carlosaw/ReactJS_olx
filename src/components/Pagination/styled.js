import styled from 'styled-components';

export const PageArea = styled.div`

.pagination {
  display: flex;
  list-style: none;

  .active {
    border-color: green;
  }

  li {
    margin-left: 5px;

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