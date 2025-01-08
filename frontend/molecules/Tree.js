import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import NavItem from "../../atoms/zenovo-sass/NavItem";
import TreeIndicator from "../../atoms/zenovo-sass/TreeIndicator";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

const TreeItem = ({ item, activeMenu, setActiveMenu }) => {
  const { label, children, slug, icon } = item;
  const [collapsed, setCollapsed] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const toggleCollapse = (item) => {
    setCollapsed(!collapsed);
    setIsActive(!isActive);
  };
  const router = useRouter();
  const route = router.asPath;

  const isActiveChildPresent = (item) => {
    if(item?.slug == route) {
      return true;
    } 

    const isActiveChild = false;
    if(children) {
      isActiveChild = item?.children?.map(isActiveChildPresent).some((i) => i == true);
    }
    return isActiveChild;

  }

  useEffect(() => {
    if(route == slug){
      setActiveMenu(label);
    } else if(children && isActiveChildPresent(item)){
      setCollapsed(false);
    }
  }, [route]);
  
  return (
    <ul>
      <NavItem
        label={label}
        slug={slug}
        onClick={children ? () => toggleCollapse(children) : () => setActiveMenu(label)}
        expandable={children ? true : false}
        state={(activeMenu == label && slug == route) ? "active" : "default"}
        isLink={true}
        icon={icon}
      />
      <AnimatePresence>
        {children && !collapsed && (
          <motion.ul
            initial={{
              height: 0,
            }}
            animate={{
              height: "100%",
            }}
            exit={{
              height: 0,
            }}
            className="ml-6 overflow-hidden subNavItem"
          >
            {children.map((child, index) => {
              return (
                <motion.li
                  initial={{
                    opacity: 0,
                    transform: "translateX(-50%)",
                    filter: "blur(10px)",
                  }}
                  animate={{
                    opacity: 1,
                    transform: "translateX(0%)",
                    filter: "blur(0px)",
                  }}
                  exit={{
                    opacity: 0,
                    transform: "translateX(-50%)",
                    filter: "blur(10px)",
                  }}
                  transition={{
                    delay: index / 20 + 0.05,
                  }}
                  className="relative"
                  key={index}
                >
                  <span className="inline-block absolute left-[-1px] top-0 bg-neutral-3 h-full w-[2px]"></span>
                  <span className="inline-block absolute left-[-24px] top-0">
                    <TreeIndicator
                      type={index === children.length - 1 ? "end" : "default"}
                    />
                  </span>
                  <TreeItem item={child} activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </ul>
  );
};

TreeItem.propTypes = {
  item: PropTypes.shape({
    label: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

const Tree = ({ data }) => {
  const [activeMenu, setActiveMenu] = useState("");
  
  return (
    <ul>
      {data.map((item, index) => (
        <React.Fragment key={index}>
          <TreeItem item={item} activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
        </React.Fragment>
      ))}
    </ul>
  );
};

Tree.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      children: PropTypes.arrayOf(PropTypes.object),
    })
  ).isRequired,
};

export default Tree;
