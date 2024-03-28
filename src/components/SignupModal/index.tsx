import React, { FC, useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { Controller, FormProvider, useForm } from "react-hook-form";

import {
  Button,
  Input,
  Label,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Icons,
} from "@/components/ui";
import { setAuthTokens, signUpReq } from "@/services/auth";

import { LoginSchema } from "../Validation";

const SignupModal: FC<ISignupModal> = ({ open, close, openLoginModal }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean | string>(false);

  const { t } = useTranslation("common");
  const { reload } = useRouter();

  const methods = useForm<TLoginRequestBody>({
    mode: "all",
    reValidateMode: "onBlur",
    resolver: yupResolver(LoginSchema),
  });
  const { handleSubmit } = methods;

  const submitHandler = async (formData: TLoginRequestBody) => {
    setLoading(true);

    try {
      const { accessToken, refreshToken } = await signUpReq(formData);
      setLoading(false);
      error && setError(false);
      setAuthTokens(accessToken, refreshToken);
      reload();
    } catch (error) {
      console.log("error", error);
      setLoading(false);
      setError(error === "User already exists" ? t("auth.message.error.alreadyExists") : true);
    }
  };

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="lg:max-w-auto lg:min-w-[425px] max-w-[325px] rounded-md">
        <DialogHeader>
          <DialogTitle className="text-3xl text-center mt-2">{t("auth.signup")}</DialogTitle>
          {loading && <Icons.spinner className="h-6 w-6 m-auto animate-spin" />}
          {error && (
            <DialogDescription className="text-red-700 text-center text-xs">
              {typeof error === "boolean" ? t("auth.message.error.somethingWentWrong") : error}
            </DialogDescription>
          )}
        </DialogHeader>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="flex flex-col items-start justify-start gap-3 lg:gap-4 py-4"
          >
            <div className="w-full">
              <Label htmlFor="email">{t("auth.email")}</Label>
              <Controller
                name="email"
                render={({ field, fieldState }) => (
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    className="mt-2"
                    {...field}
                    message={fieldState.error?.message && t(`${fieldState.error?.message}`)}
                    status={fieldState.error?.message ? "error" : undefined}
                  />
                )}
              />
            </div>
            <div className="w-full">
              <Label htmlFor="password">{t("auth.password")}</Label>
              <Controller
                name="password"
                render={({ field, fieldState }) => (
                  <Input
                    id="password"
                    type="password"
                    placeholder="****"
                    className="mt-2"
                    {...field}
                    message={fieldState.error?.message && t(`${fieldState.error?.message}`)}
                    status={fieldState.error?.message ? "error" : undefined}
                  />
                )}
              />
            </div>
            <DialogFooter className="block text-center px-12">
              <Button type="submit" className="w-full mb-1">
                {t("auth.signup")}
              </Button>
              <Label>
                {t("auth.alreadyhaveAnAccount")}{" "}
                <Button
                  variant="ghost"
                  className="p-0 h-auto text-blue-600 hover:bg-transparent"
                  onClick={openLoginModal}
                  disabled={loading}
                >
                  {t("auth.login")}
                </Button>
                .
              </Label>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default SignupModal;
