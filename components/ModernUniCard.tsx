"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, MapPin, ArrowUpRight, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface UniCardProps {
  id: string;
  name: string;
  short: string;
  type: string;
  price: string;
  rating: number;
  loc: string;
  img: string;
}

export default function ModernUniCard({ u }: { u: UniCardProps }) {
  const fallbackImage = "/notfound.jpg";
  const [isPressed, setIsPressed] = useState(false);

  const [imgSrc, setImgSrc] = useState(u.img);

  useEffect(() => {
    setImgSrc(u.img);
  }, [u.img]);

  return (
    <Link
      href={`/universities/${u.id}`}
      className="group relative block h-full"
    >
      <div className="relative h-full bg-card rounded-3xl overflow-hidden border border-border/50 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-universe-purple/10 hover:-translate-y-1 hover:border-universe-purple/50 flex flex-col">
        <div className="relative h-56 overflow-hidden">
          <div className="relative h-64 w-full group">
            <Image
              src={imgSrc || fallbackImage}
              alt={u.short}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              onError={() => setImgSrc(fallbackImage)}
              unoptimized={imgSrc === fallbackImage}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <div className="absolute top-4 left-4">
            <Badge className="bg-background/90 backdrop-blur-md text-foreground hover:bg-background font-bold border-none shadow-sm">
              {u.type}
            </Badge>
          </div>

          <div className="absolute top-4 right-4 flex items-center gap-1 bg-background/90 backdrop-blur-md px-2.5 py-1 rounded-full text-foreground font-bold text-xs shadow-sm">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />{" "}
            {u.rating}
          </div>

          <div className="absolute bottom-3 left-3 z-20">
            <button
              className="bg-background/90 backdrop-blur-md p-2 rounded-full shadow-sm border border-border/50 
               hover:bg-background transition-colors active:scale-90"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onMouseDown={() => setIsPressed(true)}
              onMouseUp={() => setIsPressed(false)}
              onMouseLeave={() => setIsPressed(false)}
            >
              <Heart
                className={`h-4 w-4 transition-all duration-200 ${
                  isPressed
                    ? "text-red-500 fill-red-500 scale-90"
                    : "text-universe-purple stroke-universe-purple scale-100"
                }`}
                fill={isPressed ? "currentColor" : "none"}
                strokeWidth={1.5}
              />
            </button>
          </div>
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-universe-purple transition-colors leading-tight">
              {u.short}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-1 group-hover:text-foreground transition-colors">
              {u.name}
            </p>
          </div>

          <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                Стоимость
              </span>
              <span className="text-universe-purple font-bold">{u.price}</span>
            </div>

            <div className="flex items-center gap-1 text-muted-foreground text-sm bg-secondary/50 px-3 py-1.5 rounded-lg group-hover:bg-universe-purple/10 group-hover:text-universe-purple transition-colors">
              <MapPin className="h-3.5 w-3.5" /> {u.loc}
            </div>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-50 group-hover:scale-100">
            <div className="bg-white/20 backdrop-blur-md border border-white/50 p-4 rounded-full text-white">
              <ArrowUpRight className="h-8 w-8" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
