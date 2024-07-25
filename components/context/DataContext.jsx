import { createContext, useState } from "react";
import { PropTypes } from "prop-types";
const DataContext = createContext();


export const DataProvider = ({ children }) => {
  DataProvider.propTypes = {
    children: PropTypes.element,
  };
  const [theme, setTheme] = useState([]);

  const handleTheme = (newTheme) => {
    setTheme(newTheme);
  };

  const data = { theme, handleTheme };
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export default DataContext;
