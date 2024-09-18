import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React from "react";

type LoadingButtonProps = {
  children: React.ReactNode;
  isLoading: boolean;
  isDisabled?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const LoadingButton = ({
  children,
  isLoading,
  isDisabled = false,
  onClick,
}: LoadingButtonProps) => {
  return (
    <Button onClick={onClick} disabled={isDisabled}>
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {children}
        </>
      ) : (
        <>{children}</>
      )}
    </Button>
  );
};

export default LoadingButton;
