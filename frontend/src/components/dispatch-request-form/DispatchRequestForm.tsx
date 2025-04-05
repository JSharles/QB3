"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Image from "next/image";
import { useState } from "react";

const dispatchRequestSchema = z.object({
  zone: z.string().nonempty({ message: "Please select a zone" }),
  requestedVolume: z.coerce
    .number()
    .min(1, { message: "Minimum volume is 1 m³" }),
  pickupDate: z.string().nonempty({ message: "Pickup date is required" }),
  estimatedWeight: z.coerce
    .number()
    .min(1, { message: "Minimum weight is 1 kg" }),
  description: z.string().optional(),
  specialInstructions: z.string().optional(),
});

type DispatchRequestFormData = z.infer<typeof dispatchRequestSchema>;

const inputStyle =
  "border-0 border-b border-white/30 bg-transparent text-white text-base placeholder:text-white/60 rounded-none focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/50 transition";

const smallInputStyle = `${inputStyle} w-32`;

const labelStyle = "text-white text-base font-medium tracking-tight mb-1 block";
const textareaStyle =
  "w-full h-16 border-0 border-b border-white/30 bg-transparent text-white placeholder:text-white/60 text-base rounded-none focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/50 transition";

const DispatchRequestForm = () => {
  const { register, handleSubmit, setValue, watch, formState } =
    useForm<DispatchRequestFormData>({
      resolver: zodResolver(dispatchRequestSchema),
    });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [zones, setZones] = useState<
    { id: string; name: string; volume: number }[]
  >([]);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const fetchZones = async () => {};

  const watchedZone = watch("zone");

  const onSubmit = (data: DispatchRequestFormData) => {
    console.log("Form submitted:", data, selectedZone);
  };

  return (
    <section className="relative py-12 w-full flex items-center justify-center overflow-hidden bg-black">
      <Image
        src="/images/e-commerce.webp"
        alt="Background"
        fill
        className="object-cover grayscale  brightness-[0.3] z-0"
        priority
      />
      <div className="absolute inset-0 bg-purple-500/15 z-0" />

      <div className="relative z-10 w-full max-w-4xl px-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full bg-white/5 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Sélection de la zone */}
          <div className="md:col-span-2">
            <Label htmlFor="zone" className={labelStyle}>
              Select Zone
            </Label>
            <Select
              onValueChange={(value) => {
                setValue("zone", value);
                setSelectedZone(value);
              }}
              defaultValue=""
            >
              <SelectTrigger
                className={`${inputStyle} data-[placeholder]:text-white/60`}
              >
                <SelectValue placeholder="Select a zone" />
              </SelectTrigger>
              <SelectContent>
                {zones.map((zone) => (
                  <SelectItem key={zone.id} value={zone.id}>
                    {zone.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formState.errors.zone && (
              <p className="text-red-500 text-sm mt-1">
                {formState.errors.zone.message}
              </p>
            )}
          </div>

          {/* Affichage des détails de la zone sélectionnée */}
          {watchedZone && (
            <div className="md:col-span-2 text-white">
              <p>
                Available Volume in{" "}
                {zones.find((z) => z.id === watchedZone)?.name}:{" "}
                {zones.find((z) => z.id === watchedZone)?.volume} m³
              </p>
            </div>
          )}

          <div>
            <Label htmlFor="requestedVolume" className={labelStyle}>
              Requested Volume (m³)
            </Label>
            <Input
              id="requestedVolume"
              type="number"
              step="0.1"
              min="0"
              {...register("requestedVolume")}
              placeholder="e.g. 5.5"
              className={smallInputStyle}
            />
            {formState.errors.requestedVolume && (
              <p className="text-red-500 text-sm mt-1">
                {formState.errors.requestedVolume.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="pickupDate" className={labelStyle}>
              Pickup Date
            </Label>
            <Input
              id="pickupDate"
              type="date"
              {...register("pickupDate")}
              className={inputStyle}
            />
            {formState.errors.pickupDate && (
              <p className="text-red-500 text-sm mt-1">
                {formState.errors.pickupDate.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="estimatedWeight" className={labelStyle}>
              Estimated Weight (kg)
            </Label>
            <Input
              id="estimatedWeight"
              type="number"
              step="0.1"
              min="0"
              {...register("estimatedWeight")}
              placeholder="e.g. 50.5"
              className={smallInputStyle}
            />
            {formState.errors.estimatedWeight && (
              <p className="text-red-500 text-sm mt-1">
                {formState.errors.estimatedWeight.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="description" className={labelStyle}>
              Description
            </Label>
            <textarea
              id="description"
              {...register("description")}
              placeholder="Describe your goods (optional)"
              className={textareaStyle}
            />
            {formState.errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {formState.errors.description.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="specialInstructions" className={labelStyle}>
              Special Instructions
            </Label>
            <textarea
              id="specialInstructions"
              {...register("specialInstructions")}
              placeholder="Any specific instructions? (optional)"
              className={textareaStyle}
            />
            {formState.errors.specialInstructions && (
              <p className="text-red-500 text-sm mt-1">
                {formState.errors.specialInstructions.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <Button
              type="submit"
              disabled={!formState.isValid}
              className="w-full bg-white/10 hover:bg-white/20 text-white text-lg font-semibold py-3 transition-colors duration-200 border border-white/30"
            >
              Submit Dispatch Request
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default DispatchRequestForm;
