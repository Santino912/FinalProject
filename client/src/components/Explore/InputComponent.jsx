import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import style from "./Explore.module.css";

const InputComponent = ({ filters, setFilters, handleChangeFetch }) => {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <Paper
      component="form"
      className={style.paperStyle}
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "95vw",
        maxWidth: "400px",
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1, color: "black" }}
        placeholder="Search"
        inputProps={{ "aria-label": "search google maps" }}
        onChange={(e) => handleChange(e)}
        value={filters.name}
        name="name"
      />
      <IconButton
        onClick={(e) => handleChangeFetch(e)}
        type="button"
        sx={{ p: "10px" }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};
export default InputComponent;
