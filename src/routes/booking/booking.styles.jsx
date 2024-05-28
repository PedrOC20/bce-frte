import styled from "styled-components";

export const BookingContainer = styled.div`
  display: flex;
  width: auto;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 30px auto;

  p {
    font-size: 15 px;
    margin-bottom: 0
  }
`

export const Details = styled.div`
`;

export const Quantity = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Arrow = styled.div`
  cursor: pointer;
  padding: 3px;
  border: 1px solid darkgrey;
`

export const Value = styled.span`
  margin: 0 10px;
`

export const Form = styled.form`
  margin: auto;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
  border-top: 1px solid darkgrey;
`;

export const Border = styled.h3`
  padding-top: 20px;
  border-top: 1px solid darkgrey;
`;