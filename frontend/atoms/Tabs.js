import React from "react";
import Text from "atoms/Text";
import Link from "next/link";

const Tab = ({ active = false, onClick = () => {}, title, href }) => {
  return (
    <Link href={href ? href : {}}>
      <li
        className={`rounded-[20px] cursor-pointer py-3 px-[26px] whitespace-pre text-center ${
          active ? "bg-[#FB7A03]" : "bg-black"
        }`}
        onClick={onClick}
      >
        <Text variant="bodySmall" textColor="text-white">
          {title}
        </Text>
      </li>
    </Link>
  );
};
const Tabs = ({ className = "", list, onClick = () => {} }) => {
  return (
    <ul className={`space-y-6 ${className}`}>
      {list.map((item) => (
        <Tab
          key={item.id}
          active={item.active}
          title={item.title}
          href={item.href}
          onClick={onClick}
        />
      ))}
    </ul>
  );
};

export default Tabs;
