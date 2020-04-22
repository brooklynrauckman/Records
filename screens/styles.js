import { css } from "@emotion/native";

export const page = css`
  display: flex;
  flex-direction: column;
  margin: 16px;
  background-color: white;
`;

export const headingOne = css`
  font-size: 24px;
`;

export const newAlbumInfo = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const inputGroup = css`
  flex: 1;
  flex-direction: column;
  padding: 16px;
`;

export const loginGroup = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 240px;
`;

export const loginGroupContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 16px;
`;

export const addPic = (deviceWidth) => css`
  width: ${deviceWidth};
  height: 135px;
  background-color: #eee;
  border: none;
  border-radius: 5px;
  font-size: 24px;
  color: white;
`;

export const picPreview = (deviceWidth) => css`
  width: ${deviceWidth};
  height: 135px;
  border-radius: 5px;
`;

export const basicInput = css`
  flex: 1;
  margin: 16px 0;
  padding: 4px 0;
  border-bottom-color: #ccc;
  border-bottom-width: 2;
`;

export const topBasicInput = css`
  flex: 1;
  margin: 16px 0 0 0;
  padding: 4px 0;
  border-bottom-color: #ccc;
  border-bottom-width: 2;
`;

export const inputText = css`
  font-size: 20px;
  color: #999;
`;

export const tagText = css`
  font-size: 20px;
  color: #999;
  text-align: center;
`;

export const addTagText = css`
  min-width: 120px;
  font-size: 20px;
  color: #999;
`;

export const loginInput = css`
  display: flex;
  margin: 16px;
  padding: 4px 8px;
  border-bottom-color: #ccc;
  border-bottom-width: 2;
`;

export const tagButton = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 8px 8px 8px 0;
  padding: 4px 16px;
  border: 1px solid #999;
  border-radius: 50px;
`;

export const clearIcon = css`
  padding-left: 16px;
`;

export const addTagButton = css`
  min-width: 128px;
  padding: 4px 8px;
  margin: 8px 0;
  border: 1px solid #999;
  border-radius: 50px;
`;

export const tagContainer = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: left;
  margin: 16px 0;
`;

export const submitButton = css`
  margin: 16px 0 230px 0;
  padding: 16px 32px;
  width: 100%;
  background-color: #c81111;
  border: none;
  border-radius: 50px;
`;

export const loginButton = css`
  margin: 16px 0;
  padding: 16px 32px;
  width: 100%;
  background-color: #c81111;
  border: none;
  border-radius: 50px;
`;

export const submitText = css`
  color: white;
  font-size: 20px;
  text-align: center;
`;

export const albumInfo = css`
  display: flex;
  flex-direction: column;
`;

export const albumPic = (deviceWidth) => css`
  width: ${deviceWidth};
  height: 373px;
  margin-bottom: 32px;
  background-color: #eee;
  border-radius: 5px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.15);
`;

export const row = css`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const rowLeft = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const searchSection = css`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const headingTwo = css`
  margin-right: 64px;
  font-size: 26px;
  font-weight: bold;
`;

export const countButton = css`
  color: #999;
  font-size: 20px;
  font-weight: bold;
`;

export const deleteButton = css`
  color: white;
  font-size: 20px;
`;

export const buttonContainer = css`
  min-height: 24px;
  margin: 16px 0;
  padding: 4px 8px;
  background-color: #eee;
  border: none;
  border-radius: 20px;
  box-shadow: 1px 1px 1px #eee;
`;

export const deleteContainer = css`
  min-height: 24px;
  margin: 16px 0;
  padding: 4px 8px;
  background-color: #c81111;
  border: none;
  border-radius: 20px;
`;

export const buttonRight = css`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const buttonContainerTop = css`
  align-self: flex-start;
  min-height: 24px;
  padding: 4px 8px;
  background-color: #eee;
  border: none;
  border-radius: 20px;
  box-shadow: 1px 1px 1px #eee;
`;

export const artist = css`
  margin-top: 8px;
  margin-bottom: 8px;
  font-size: 20px;
  color: #999;
  font-weight: normal;
`;

export const date = css`
  font-weight: normal;
  color: #999;
  font-size: 20px;
`;

export const lastPlayed = css`
  margin-bottom: 24px;
  font-weight: bold;
  color: black;
  font-size: 20px;
`;

export const notes = css`
  margin-bottom: 0;
  font-weight: bold;
  color: black;
  font-size: 20px;
`;

export const note = css`
  margin-top: 8px;
  font-weight: normal;
  color: black;
  font-size: 20px;
`;

export const searchBar = css`
  flex: 1;
  margin: 0 0 24px 0;
  padding: 16px 32px;
  background-color: #eee;
  border: none;
  border-radius: 30px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.15);
  color: black;
  font-size: 18px;
`;

export const closeIcon = css`
  align-self: flex-start;
  margin-left: -64px;
  margin-right: 8px;
  padding: 16px;
`;

export const plusIcon = css`
  display: flex;
  align-items: center;
  padding-top: 53px;
`;

export const closeIconAlbum = css`
  padding: 48px 16px 0 16px;
`;

export const closeIconContainer = css`
  display: flex;
  align-items: flex-end;
`;

export const smallPic = (deviceWidth) => css`
  width: ${deviceWidth};
  height: 160px;
  margin-bottom: 8px;
  background-color: lightgray;
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.15);
`;

export const smallPicImage = (deviceWidth) => css`
  width: ${deviceWidth};
  height: 160px;
  margin-bottom: 8px;
  background-color: lightgray;
  border-radius: 5px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.15);
`;

export const smallPicText = css`
  display: flex;
  justify-content: center;
  height: 160px;
  margin-bottom: 8px;
  background-color: lightgray;
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.15);
`;

export const smallPicAlbum = css`
  margin: 0 8px;
  font-size: 20px;
  font-weight: bold;
`;
export const smallPicArtist = css`
  margin: 0 8px;
  font-size: 16px;
  color: #999;
  font-weight: normal;
`;

export const albumResults = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const collectionTop = (width) => css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 48px 16px 8px 16px;
  width: ${width};
`;

export const sort = css`
  padding-left: 16px;
  font-weight: normal;
  font-size: 20px;
  color: black;
`;

export const navBar = css`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 8px 0 48px 0;
  background-color: #eee;
`;

export const collectionIcon = css`
  padding-bottom: 2px;
`;

export const myCollection = css`
  padding-right: 16px;
  font-size: 32px;
  font-weight: bold;
`;

export const dropdownContainer = (deviceWidthTwo) => css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 16px;
  width: ${deviceWidthTwo};
`;

export const dropdown = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export const dropdownText = css`
  font-size: 16px;
  padding: 8px;
`;

export const dropdownTextContainer = css`
  border-bottom-color: #ccc;
  border-bottom-width: 2;
`;

export const headingPadding = css`
  margin: 8px 0;
  /* padding: 4px 8px; */
`;
