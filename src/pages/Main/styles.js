import styled, { keyframes, css } from 'styled-components';

const rotate = keyframes`
  from{
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Loading = styled.div`
  display: flex;

  svg {
    margin: 150px auto;
    height: 200px;
    flex: 1;
    color: #333;
  }
  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const UfInput = styled.input`
  border-radius: 4px;
  height: 45px;
  margin: 0 10px;
  width: 45px;
  justify-content: center;
  text-align: center;
`;

export const CityInput = styled.input`
  border-radius: 4px;
  height: 45px;
  margin: 0 10px;
  justify-content: center;
  text-align: center;
`;

export const Pagination = styled.div`
  color: #333;
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: 15px;

  button {
    margin: 0 10px;
    color: #fff;
    background: #428bca;
    text-align: center;
    border: 1px solid transparent;
    border-radius: 4px;
    width: 20px;
  }
`;

export const FormContainer = styled.div`
  background-color: rgba(51, 51, 51, 0.8);
  box-shadow: 0 1px 5px #333;
  padding: 10px 15px;
  height: 65px;
  width: 600px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;

  img {
    display: flex;
    margin-right: 20px;
    max-height: 90%;
  }
`;

export const FavoriteButton = styled.button`
  border: none;
  background: transparent;
  :focus {
    border: none;
  }
`;

export const SearchButton = styled.button.attrs(props => ({
  type: 'submit',
}))`
  color: #fff;
  background: #428bca;
  height: 44px;
  padding: 6px 12px;
  font-size: 14px;
  text-align: center;
  border: 1px solid transparent;
  border-radius: 4px;
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;

  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    & + li {
      border-top: 1px solid #eee;
    }

    a {
      color: #7159c1;
      text-decoration: none;
    }

    span {
      font-weight: bold;
      margin-bottom: 5px;
    }

    img {
      width: 100px;
      display: flex;
      border-radius: 4px;
    }

    div {
      padding: 5px 10px;
      color: #222;
      margin-left: 10px;
      flex: 1;
      display: flex;
      flex-direction: column;
      text-align: justify;
    }
  }
`;
