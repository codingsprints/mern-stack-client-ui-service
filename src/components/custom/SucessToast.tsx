import { CircleCheck } from "lucide-react";

export const SucessToast = () => {
  return (
    <>
      <div className="flex items-center gap-2">
        <CircleCheck className="text-green-700" />
        <span className="font-bold">Added to cart</span>
      </div>
    </>
  );
};
