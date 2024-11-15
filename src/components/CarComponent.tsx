"use client";

import React, { useRef } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Badge } from "./ui/badge";
import { Car } from "lucide-react";
import Link from "next/link";

type Props = {
  car: CarWithId;
  global: boolean;
};

const CarComponent = ({ car, global }: Props) => {
  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnMouseEnter: false, stopOnInteraction: false })
  );

  return (
    <Card>
      <Carousel plugins={[plugin.current]}>
        <CarouselContent>
          {car.images.map((image, index) => (
            <CarouselItem key={index} className="rounded-lg">
              <img
                src={image}
                alt={`cars${index}`}
                className="object-cover w-full select-none rounded-lg h-52"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <Link href={`/car/${car.id}`}>
        <CardContent className="mt-4 relative">
          <div className="flex justify-between items-start mb-2">
            <CardTitle className="text-xl">{car.title}</CardTitle>
            <Badge variant="secondary" className="capitalize flex gap-2">
              <Car className="w-4 h-4" />
              {car.car_type}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground mb-2">{car.company}</p>
          <p className="text-sm mb-4">{car.description}</p>

          <div className="flex flex-wrap gap-2">
            {car.tags.map((tag) => (
              <Badge key={tag} variant="default">
                {tag}
              </Badge>
            ))}
          </div>

          {!global && (
            <div className="absolute right-2 bottom-2">
              {car.isActive ? (
                <div className="relative inline-flex">
                  <div className="rounded-full bg-green-400 h-[10px] w-[10px] inline-block mr-2" />
                  <div className="absolute animate-ping rounded-full bg-green-400 h-[10px] w-[10px] mr-2" />
                </div>
              ) : (
                <div className="relative inline-flex">
                  <div className="rounded-full bg-destructive h-[10px] w-[10px] inline-block mr-2" />
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Link>
    </Card>
  );
};

export default CarComponent;
