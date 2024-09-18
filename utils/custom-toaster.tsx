import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

const showToastError = ({
  variant = "default",
  title,
  description,
}: ShowToastErrorProps) => {
  toast({
    variant,
    title,
    description,
    action: <ToastAction altText="Try again">Try again</ToastAction>,
  });
};

const showToastSuccess = ({
  variant = "default",
  description,
  title,
}: ShowToastSuccess) => {
  toast({
    variant,
    description,
    title,
  });
};

export { showToastError, showToastSuccess };
