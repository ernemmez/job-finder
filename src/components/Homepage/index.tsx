import React, { FC } from "react";

import { useTranslation } from "next-i18next";

const Homepage: FC = () => {
  const { t } = useTranslation("common");

  return (
    <div className="w-full h-full min-h-full container lg:py-24 p-24 bg-white shadow-lg rounded">
      <section className="text-center m-auto lg:w-1/2">
        <h1 className="text-4xl font-bold mb-8">{t("homepageContent.title")}</h1>
        <p className="text-lg font-normal">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia esse excepturi officia est, libero
          consequuntur placeat corporis debitis dolorem ullam molestias facere, cumque laudantium. Rem deleniti
          exercitationem autem optio voluptatum!
        </p>
      </section>
    </div>
  );
};

export default Homepage;
