import { css } from "@emotion/react";

export const sharedCardStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 28%;
  background-color: #f0f0f0;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
`;

export const sharedSectionStyles = css`
  display: flex;
  flex-direction: column;
  width: 65%;
  background-color: #f0f0f0;
  margin-top: 2rem;
`;

export const sharedHeaderStyles = css`
  margin-bottom: 1rem;
  width: 100%;
  line-height: 1.25;
  color: #236f8d;
  text-align: center;
`;

export const sharedFontStyles = css`
  font-size: 1rem;
  color: #236f8d;
  margin-bottom: 1rem;
  line-height: 1.25;
  text-align: center;
`;
