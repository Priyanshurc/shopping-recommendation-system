import React, { useMemo, useState } from "react";
import Tree from "./Tree";
import { navigation } from "../../helpers/constants";
import { usePermissions } from "organisms/zenovo-sass/PermissionProvider";
import { getModuleInfoForPath } from "helpers/route-module-mappers";

const Sidebar = ({ className, isCollapsed }) => {
  const [visible, setVisible] = useState(false);
  const { checkAccessForModule, permissions } = usePermissions();

  const filterNavigation = (navItems) => {
    return navItems.reduce((filtered, item) => {
      // If item has moduleId, check permissions, otherwise include it
      const moduleInfo = getModuleInfoForPath(item.slug);
      if (moduleInfo?.moduleId) {
        if (checkAccessForModule(moduleInfo.moduleId)?.read) {
          const filteredChildren = item.children ? filterNavigation(item.children) : null;
          filtered.push({
            ...item,
            ...(filteredChildren && filteredChildren.length > 0 && { children: filteredChildren })
          });
        }
      } else {
        const filteredChildren = item.children ? filterNavigation(item.children) : null;
        filtered.push({
          ...item,
          ...(filteredChildren && filteredChildren.length > 0 && { children: filteredChildren })
        });
      }
      return filtered;
    }, []);
  };

  const filteredNavigation = useMemo(() => filterNavigation(navigation), [navigation, permissions]);
  return (
    <>
      <div
        className={`h-full flex flex-col w-full sm:w-80 p-4 z-14 overflow-y-auto scrollbar  bg-neutral-0 shadow-2xl border-r border-[#CDCDCD] 
        ${className && className} `}
      >
        <div className="flex flex-col mb-auto">
          <Tree data={filteredNavigation} />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
