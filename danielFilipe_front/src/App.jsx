import axios from "axios";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

import tiktok from "../public/Icones/tiktok.svg";
import instagram from "../public/Icones/Instagram.svg";
import Twitter from "../public/Icones/Twitter.svg";
import yt from "../public/Icones/youtube.svg";
import Login from "./Login";
import Close from "../public/Icones/x.svg";

const Root = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: space-between;
`;
const ContainerNavbar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  flex-direction: row;
`;

const Logo = styled.h1`
  @font-face {
    font-family: "Concert One";
    src: url("../public/fonts/Concert_One/ConcertOne-Regular.ttf");
  }

  font-family: "Concert One";
  font-weight: 700;
`;

const Button = styled.button`
  @font-face {
    font-family: "Roboto";
    src: url("../public/fonts/Roboto/Roboto-Regular.ttf");
  }
  font-family: "Roboto";
  background-color: #161616;
  color: #ffffff;
  border: none;
  height: 40px;
  padding-left: 50px;
  padding-right: 50px;
  font-weight: bold;
  border-radius: 10px;
`;

const ContainerFooter = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  background-color: #161616;
  color: #ffffff;
`;

const ContainerIcons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 30px;
`;

const Icon = styled.img`
  height: 30px;
  width: 30px;
`;

const ContainerGeneral = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ContainerHeader = styled.div`
  border-top: 2px solid #161616;
  border-bottom: 2px solid #161616;
  display: flex;
  padding: 15px;
  align-items: center;
  justify-content: center;
`;

const LinkCustom = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: #161616;
`;

const ContainerPublicacoes = styled.div`
  display: grid;
  padding: 10px;
  grid-template-areas:
    "img0 img0 img3"
    "img1 img2 img3"
    "img4 img5 img5"
    "img4 img6 img7";
  gap: 10px;
`;

const HeaderLogin = styled.div`
  display: flex;
  padding: 5px;
  @font-face {
    font-family: "Roboto";
    src: url("../public/fonts/Roboto/Roboto-Regular.ttf");
  }
  justify-content: center;
  font-family: "Roboto";
  width: 100%;
  border-bottom: 2px solid #161616;
`;

const InputLabel = styled.label``;

const InputCustom = styled.input`
  display: flex;
  border: 1px solid #000000;
  width: 100%;
  border-radius: 8px;
  padding: 4px;
`;

const App = () => {
  const [allPublicacoes, setAllPublicacoes] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState(null);
  const [senha, setSenha] = useState(null);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorSenha, setErrorSenha] = useState(false);

  useEffect(() => {
    getAllPublicacoes();
  }, []);

  const getAllPublicacoes = async () => {
    const { data } = await axios.get("http://localhost:3333/publicacoes/all");
    setAllPublicacoes(data.message);
  };

  const postLogin = async () => {
    if (email == null || email == "") {
      return setErrorEmail(true);
    }
    setErrorEmail(false);

    if (senha == null ||senha == "") {
      return setErrorSenha(true);
    }
    setErrorSenha(false);

    if (senha != null && senha != "" && email != null && email != "") {
      console.log(email, senha);
      try {
        const { data } = await axios.post(
          "http://localhost:3333/usuarios/login",
          {
            email: email,
            senha: senha,
          }
        );

        localStorage.setItem("token", data.token);
        handleLogin()
      } catch (error) {
        if (error.response.data.errorEmail) {
          setErrorEmail(true);
        } else {
          setErrorEmail(false);
        }

        if (error.response.data.errorSenha) {
          setErrorSenha(true);
        } else {
          setErrorSenha(false);
        }
      }
    }
  };

  const handleLogin = () => {
    setShowLogin(!showLogin);
  };

  return (
    <>
      <Root>
        {showLogin ? (
          <Login>
            {/* <div style={{ display: "flex", justifyContent: "end" }}>
                <Icon src={Close}></Icon>
            </div> */}
            <HeaderLogin>
              <h2>Login</h2>
            </HeaderLogin>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "10px",
                gap: "10px",
              }}
            >
              <InputLabel>E-mail</InputLabel>
              <InputCustom
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  border: errorEmail
                    ? "2px solid #C60E0E"
                    : "2px solid #000000",
                }}
              />
              <InputLabel>Senha</InputLabel>
              <InputCustom
                onChange={(e) => setSenha(e.target.value)}
                style={{
                  border: errorSenha
                    ? "2px solid #C60E0E"
                    : "2px solid #000000",
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <Button
                  onClick={() => handleLogin()}
                  style={{
                    backgroundColor: "transparent",
                    border: "2px solid #161616",
                    color: "#000000",
                  }}
                >
                  Cancelar
                </Button>
                <Button onClick={() => postLogin()}>Entrar</Button>
              </div>
            </div>
          </Login>
        ) : null}
        <ContainerGeneral>
          <ContainerNavbar>
            <Logo>FOTOGRAFIA GELADA</Logo>
            <Button onClick={() => handleLogin()}>Login</Button>
          </ContainerNavbar>
          <ContainerHeader>
            <LinkCustom href="#">Home</LinkCustom>
          </ContainerHeader>
        </ContainerGeneral>
        <ContainerPublicacoes>
          {allPublicacoes.map((e, i) => {
            return (
              <div
                style={{ height: "100%", width: "100%", gridArea: `img${i}` }}
              >
                <img
                  style={{
                    margin: "auto",
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                  }}
                  src={"../public/Imagens/" + e.imagem}
                />
              </div>
            );
          })}
        </ContainerPublicacoes>
        <ContainerFooter>
          <Logo>FOTOGRAFIA GELADA</Logo>
          <ContainerIcons>
            <Icon src={Twitter}></Icon>
            <Icon src={instagram}></Icon>
            <Icon src={yt}></Icon>
            <Icon src={tiktok}></Icon>
          </ContainerIcons>
          <h5>Copyright 2024</h5>
        </ContainerFooter>
      </Root>
    </>
  );
};

export default App;
