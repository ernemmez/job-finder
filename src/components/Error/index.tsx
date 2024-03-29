import React, { FC } from "react";

import { Terminal } from "lucide-react";
import Link from "next/link";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  Button,
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui";

const Error: FC<IErrorProps> = ({ status, result }) => {
  return (
    <div className={`flex items-center justify-center bg-white ${result ? "h-[600px]" : "h-screen"}`}>
      <Card className={`w-[420px] ${result && "border-none shadow-none"}`}>
        <CardHeader className="text-center">
          {status && <CardTitle className="lg:text-7xl text-4xl">{status}</CardTitle>}
          <CardDescription>
            <Alert>
              <Terminal className="h-10 w-10" />
              <AlertTitle>{result ? "Ooops" : "Heads up!"}</AlertTitle>
              <AlertDescription>{result || "You're somewhere you shouldn't be :/"}</AlertDescription>
            </Alert>
          </CardDescription>
        </CardHeader>
        {status && (
          <CardFooter className="flex justify-center">
            <Button>
              <Link href="/">Go Back</Link>
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default Error;
