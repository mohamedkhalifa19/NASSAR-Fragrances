"use client";

import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useRef } from "react";
import SkeletonBox from "./Skelton/SkeletonBox";

const libraries: "marker"[] = ["marker"];

export default function Location() {
  const mapRef = useRef<google.maps.Map | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries,
  });

  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;

    const { AdvancedMarkerElement } = google.maps.marker;

    new AdvancedMarkerElement({
      map: mapRef.current,
      position: { lat: 30.660431, lng: 30.722607 },
    });
  }, [isLoaded]);

  if (!isLoaded) {
    return <SkeletonBox className="min-h-[300px] w-full rounded-2xl" />;
  }

  return (
    <GoogleMap
      onLoad={(map) => {
        mapRef.current = map;
      }}
      mapContainerStyle={{
        width: "100%",
        height: "300px",
      }}
      center={{
        lat: 30.660444,
        lng: 30.722611,
      }}
      zoom={15}
    />
  );
}
