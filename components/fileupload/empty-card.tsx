import { ImageIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

interface EmptyCardProps extends React.ComponentPropsWithoutRef<typeof Card> {
  title: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
}

export function EmptyCard({
  title,
  description,
  icon: Icon = ImageIcon,
  action,
  className,
  ...props
}: EmptyCardProps) {
  return (
    <Card
      className={cn(
        "flex w-full border-0 shadow-none flex-col items-center justify-center space-y-6 bg-transparent p-16",
        className,
      )}
      {...props}
    >
      <div className="shrink-0 rounded-full border border-dashed p-4">
        <Icon className="size-8 text-muted-foreground" aria-hidden="true" />
      </div>
      <div className="flex flex-col items-center gap-1.5 text-center">
        <CardTitle className="text-xl text-iDonate-navy-primary">
          {title}
        </CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </div>
      {action ? action : null}
    </Card>
  );
}
