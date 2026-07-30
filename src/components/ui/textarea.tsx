import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "resize-none custom-scrollbar break-all flex field-sizing-content min-h-16 w-full rounded-md border border-input bg-primary/10 px-3 py-2 text-base shadow-xs outline-none placeholder:text-muted-foreground transition-all focus-visible:border-primary focus-visible:ring-0 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
