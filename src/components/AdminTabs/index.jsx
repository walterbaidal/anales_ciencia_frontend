import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import BusinessIcon from "@mui/icons-material/Business";
import BiotechIcon from "@mui/icons-material/Biotech";
import PersonIcon from "@mui/icons-material/Person";
import HailIcon from "@mui/icons-material/Hail";
import { DataTable } from "../DataTable";
import { ButtonAddUser } from "../ButtonAddUser";
import { CircularProgress } from "@mui/material";
import { ButtonAddElement } from "../ButtonAddElement";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export const AdminTabs = ({ users, products, persons, entities }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return users ? (
    <>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <Tab icon={<PersonIcon />} label="Usuarios" {...a11yProps(0)} />
          <Tab icon={<BiotechIcon />} label="Productos" {...a11yProps(1)} />
          <Tab icon={<BusinessIcon />} label="Entidades" {...a11yProps(2)} />
          <Tab icon={<HailIcon />} label="Personas" {...a11yProps(3)} />
        </Tabs>
        <TabPanel
          style={{ height: 400, width: "100%" }}
          value={value}
          index={0}
        >
          <ButtonAddUser />
          <DataTable rows={users} data_table_selected={"Usuario"} />
        </TabPanel>
        <TabPanel
          style={{ height: 400, width: "100%" }}
          value={value}
          index={1}
        >
          <ButtonAddElement
            selected_tab={"Producto"}
            products={products}
            persons={persons}
            entities={entities}
          />
          <DataTable
            rows={products}
            data_table_selected={"Producto"}
            products={products}
            entities={entities}
            persons={persons}
          />
        </TabPanel>
        <TabPanel
          style={{ height: 400, width: "100%" }}
          value={value}
          index={2}
        >
          <ButtonAddElement
            selected_tab={"Entidad"}
            products={products}
            persons={persons}
            entities={entities}
          />
          <DataTable
            rows={entities}
            data_table_selected={"Entidad"}
            products={products}
            entities={entities}
            persons={persons}
          />
        </TabPanel>
        <TabPanel
          style={{ height: 400, width: "100%" }}
          value={value}
          index={3}
        >
          <ButtonAddElement
            selected_tab={"Persona"}
            products={products}
            persons={persons}
            entities={entities}
          />
          <DataTable
            rows={persons}
            data_table_selected={"Persona"}
            products={products}
            entities={entities}
            persons={persons}
          />
        </TabPanel>
      </Box>
    </>
  ) : (
    <>
      <div
        className="mt-5"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <CircularProgress />
      </div>
    </>
  );
};
