import React from "react";
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';

const SideDrawer = ({ show = false, onClose = () => false, children }) => (
  <Drawer
    open={show}
    onClose={onClose}
    direction="right"
    className=""
    size={300}
    duration={200}
  >
    {children}
  </Drawer>
);

export default SideDrawer;
