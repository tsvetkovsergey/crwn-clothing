import styled from "styled-components";

export const MenuItemContainer = styled.div`
  min-width: 30%;
  height: ${({ size }) => (size ? "380px" : "240px")};
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  margin: 0 7.5px 15px;
  position: relative;
  overflow: hidden;

  &:hover {
    cursor: pointer;

    & .content {
      opacity: 0.9;
    }

    & .background-image {
      transform: scale(1.1);
      transition: transform cubic-bezier(0.25, 0.46, 0.45, 0.94);
      transition-duration: 6s;
    }
  }
`;

export const BackgroundImage = styled.div`
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center;
  transition-duration: 1s;

  ${({ imageUrl }) => `background-image: url(${imageUrl})`}
`;

export const ContentContainer = styled.div`
  height: 90px;
  padding: 0 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  background-color: white;
  opacity: 0.7;
  position: absolute;
  transition: opacity 300ms;
`;

export const TitleContainer = styled.h1`
  font-weight: bold;
  margin-bottom: 6px;
  font-size: 22px;
  color: #4a4a4a;
`;

export const SubtitleContainer = styled.span`
  font-weight: lighter;
  font-size: 16px;
`;
