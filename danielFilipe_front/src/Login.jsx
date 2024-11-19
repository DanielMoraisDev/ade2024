import { styled } from "styled-components";

const Background = styled.div`
  background-color: #00000093;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;  
  flex-direction: column;
  background-color: white;
  width: 500px;
  gap: 10px;
`;

const Login = ({ children }) => {
  return (
    <Background>
      <Container>{children}</Container>
    </Background>
  );
};

export default Login;
