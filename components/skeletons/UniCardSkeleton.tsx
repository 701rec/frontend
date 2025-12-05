import { Skeleton } from "@/components/ui/skeleton";

export default function UniCardSkeleton() {
  return (
    <div className="h-full bg-card rounded-3xl overflow-hidden border border-border/50 shadow-sm flex flex-col">
      <div className="relative h-56 w-full bg-secondary/30">
        <Skeleton className="h-full w-full" />

        <div className="absolute top-4 left-4">
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>

        <div className="absolute top-4 right-4">
          <Skeleton className="h-6 w-12 rounded-full" />
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-4 space-y-2">
          <Skeleton className="h-7 w-3/4 rounded-lg" />
          <Skeleton className="h-4 w-1/2 rounded-md" />
        </div>

        <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-5 w-24" />
          </div>

          <Skeleton className="h-8 w-24 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
