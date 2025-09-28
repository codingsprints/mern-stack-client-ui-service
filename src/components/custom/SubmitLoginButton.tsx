"use client";
import { LoaderCircle } from "lucide-react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";

export const SubmitLoginButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button>
      {pending ? (
        <div className="flex items-center justify-center gap-2">
          <LoaderCircle className="animate-spin" />
          <span>Please wait</span>
        </div>
      ) : (
        "Login"
      )}
    </Button>
  );
};
