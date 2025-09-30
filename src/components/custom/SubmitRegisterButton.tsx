"use client";
import { LoaderCircle } from "lucide-react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";

export const SubmitRegisterButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button>
      {pending ? (
        <div className="flex items-center gap-2">
          <LoaderCircle className="animate-spin" />
          <span>Please wait</span>
        </div>
      ) : (
        "Register"
      )}
    </Button>
  );
};
