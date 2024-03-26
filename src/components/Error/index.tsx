import React, { FC } from "react";

import Link from "next/link";
import { useTranslation } from "next-i18next";

import { Card, CardHeader, CardTitle, CardDescription, CardFooter, Button } from "@/components/ui";

const Error: FC<IErrorProps> = ({ status }) => {
  const { t } = useTranslation("common");

  return (
    <div className="flex items-center justify-center h-screen bg-blue-600">
      <Card className="w-[420px]">
        <CardHeader className="text-center">
          <CardTitle className="lg:text-7xl text-4xl">{status}</CardTitle>
          <CardDescription>{t("error.pageDoesNotExist")}</CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-center">
          <Button>
            <Link href="/">{t("error.goBack")}</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Error;
