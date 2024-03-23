import React, { FC } from "react";

import { useTranslation } from "next-i18next";

import { Button, Input, Label, Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui";

const LoginModal: FC<ILoginModal> = ({ open, close, openSignUpModal }) => {
  const { t } = useTranslation("common");

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-3xl text-center mt-2">{t("auth.login")}</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col items-start justify-start gap-3 lg:gap-4 py-4">
          <div className="w-full">
            <Label htmlFor="email">{t("auth.email")}</Label>
            <Input id="email" type="email" placeholder="example@email.com" className="mt-2" />
          </div>
          <div className="w-full">
            <Label htmlFor="password">{t("auth.password")}</Label>
            <Input id="password" type="password" placeholder="****" className="mt-2" />
          </div>
        </form>
        <DialogFooter className="block text-center px-12">
          <Button type="submit" className="w-full mb-1">
            {t("auth.login")}
          </Button>
          <Label>
            {t("auth.dontHaveAnAccount")}{" "}
            <Button variant="ghost" className="p-0 h-auto text-blue-600 hover:bg-transparent" onClick={openSignUpModal}>
              {t("auth.signup")}
            </Button>
            .
          </Label>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
