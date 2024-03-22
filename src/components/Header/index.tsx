import React from "react";

type HeaderProps = {
  title: string;
};

const Header: React.FC<HeaderProps> = () => {
  return (
    <div>
      <h1>header component</h1>
    </div>
  );
};

export default Header;
