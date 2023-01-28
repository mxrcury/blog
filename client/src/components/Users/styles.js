import { styled, Paper, Link } from "@mui/material";

export const ListContainer = styled("div")(() => ({
  display: "grid",
  width: "100%",
  // height:'calc(100vh - 40vh)',
  gridTemplateColumns: "30%",
  gridGap: "20px",
  justifyContent: "center",
}));
export const UserItem = styled(Paper)(() => ({
  width: "100%",
  padding: "20px 0px",
  textAlign: "center",
}));
export const UserLink = styled(Link)(() => ({
  display: "inline-block",
}));
