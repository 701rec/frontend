import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function AdmissionPageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl min-h-screen">
      <Skeleton className="h-5 w-24 mb-8" />

      <div className="flex flex-col items-center mb-16 space-y-4">
        <Skeleton className="h-7 w-48 rounded-full" />
        <Skeleton className="h-10 w-3/4 md:w-1/2" />
        <Skeleton className="h-6 w-full md:w-2/3" />
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border-border/50 bg-card/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Skeleton className="h-9 w-9 rounded-lg" />
                <Skeleton className="h-6 w-24" />
              </div>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-2 space-y-6">
          <Skeleton className="h-8 w-48 mb-4" />

          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-border/50 rounded-lg p-4">
                <Skeleton className="h-6 w-3/4" />
              </div>
            ))}
          </div>
        </div>

        <Card className="h-fit shadow-lg border-universe-purple/20 bg-card">
          <CardHeader className="border-b border-border/50 pb-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-6 w-32" />
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-10 w-full" />
            </div>

            <Skeleton className="h-10 w-full rounded-md" />

            <Skeleton className="h-3 w-48 mx-auto mt-2" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
