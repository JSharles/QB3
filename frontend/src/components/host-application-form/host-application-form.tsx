"use client";

import Image from "next/image";
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

const storageLocationSchema = z.object({
  address: z.string().nonempty({ message: "Address is required" }),
  city: z.string().nonempty({ message: "City is required" }),
  postalCode: z.string().nonempty({ message: "Postal code is required" }),
  floor: z.string().optional(),
  additionalDetails: z.string().optional(),
  ownerType: z.enum(["individual", "company"], {
    required_error: "Select owner type",
  }),
  roomType: z.enum(
    [
      "garage",
      "attic",
      "bedroom",
      "warehouse",
      "basement",
      "office",
      "shed",
      "storage_unit",
    ],
    {
      required_error: "Select room type",
    }
  ),
  volume: z.coerce.number().min(1, { message: "Minimum volume is 1 m³" }),
  availabilityStart: z.string().nonempty("Start time required"),
  availabilityEnd: z.string().nonempty("End time required"),
});

type StorageLocationFormData = z.infer<typeof storageLocationSchema>;

const inputStyle =
  "border-0 border-b border-white/30 bg-transparent text-white text-base placeholder:text-white/60 rounded-none focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/50 transition";

const smallInputStyle = `${inputStyle} w-32`;

const labelStyle = "text-white text-base font-medium tracking-tight mb-1 block";
const textareaStyle =
  "w-full h-24 border-0 border-b border-white/30 bg-transparent text-white placeholder:text-white/60 text-base rounded-none focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/50 transition";

const HostApplicationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<StorageLocationFormData>({
    resolver: zodResolver(storageLocationSchema),
  });

  const onSubmit = (data: StorageLocationFormData) => {
    console.log("Submitted data:", data);
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      <Image
        src="/images/host.webp"
        alt="Background"
        fill
        className="object-cover grayscale brightness-[0.4] z-0"
        priority
      />

      <div className="absolute inset-0 bg-black/50 z-0" />

      <div className="relative z-10 w-full max-w-4xl px-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full bg-white/5 backdrop-blur-md rounded-2xl p-10 shadow-2xl border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {[
            {
              id: "address",
              label: "Address",
              placeholder: "42 Moonlight Ave",
            },
            { id: "city", label: "City", placeholder: "Dreamtown" },
            { id: "postalCode", label: "Postal Code", placeholder: "12345" },
            { id: "floor", label: "Floor", placeholder: "Optional" },
          ].map(({ id, label, placeholder }) => (
            <div key={id}>
              <Label htmlFor={id} className={labelStyle}>
                {label}
              </Label>
              <Input
                id={id}
                {...register(id as keyof StorageLocationFormData)}
                placeholder={placeholder}
                className={inputStyle}
              />
              {errors?.[id as keyof StorageLocationFormData] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[
                    id as keyof StorageLocationFormData
                  ]?.message?.toString()}
                </p>
              )}
            </div>
          ))}
          {/* Owner type */}
          <div>
            <Label htmlFor="ownerType" className={labelStyle}>
              Owner Type
            </Label>
            <Select
              onValueChange={(value) => setValue("ownerType", value)}
              defaultValue=""
            >
              <SelectTrigger
                className={`${inputStyle} data-[placeholder]:text-white/60`}
              >
                <SelectValue placeholder="Select owner type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="individual">Individual</SelectItem>
                <SelectItem value="company">Company</SelectItem>
              </SelectContent>
            </Select>
            {errors.ownerType && (
              <p className="text-red-500 text-sm mt-1">
                {errors.ownerType.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="roomType" className={labelStyle}>
              Room Type
            </Label>
            <Select
              onValueChange={(value) => setValue("roomType", value)}
              defaultValue=""
            >
              <SelectTrigger
                className={`${inputStyle} data-[placeholder]:text-white/60`}
              >
                <SelectValue placeholder="Select room type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="garage">Garage</SelectItem>
                <SelectItem value="attic">Attic</SelectItem>
                <SelectItem value="bedroom">Bedroom</SelectItem>
                <SelectItem value="warehouse">Warehouse</SelectItem>
                <SelectItem value="basement">Basement</SelectItem>
                <SelectItem value="office">Office</SelectItem>
                <SelectItem value="shed">Shed</SelectItem>
                <SelectItem value="storage_unit">Storage Unit</SelectItem>
              </SelectContent>
            </Select>
            {errors.roomType && (
              <p className="text-red-500 text-sm mt-1">
                {errors.roomType.message}
              </p>
            )}
          </div>
          {/* Volume */}

          <div>
            <Label htmlFor="availabilityStart" className={labelStyle}>
              Availability Start
            </Label>
            <Input
              id="availabilityStart"
              type="time"
              {...register("availabilityStart")}
              className={smallInputStyle}
            />
            {errors.availabilityStart && (
              <p className="text-red-500 text-sm mt-1">
                {errors.availabilityStart.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="availabilityEnd" className={labelStyle}>
              Availability End
            </Label>
            <Input
              id="availabilityEnd"
              type="time"
              {...register("availabilityEnd")}
              className={smallInputStyle}
            />
            {errors.availabilityEnd && (
              <p className="text-red-500 text-sm mt-1">
                {errors.availabilityEnd.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="volume" className={labelStyle}>
              Volume (m³)
            </Label>
            <Input
              id="volume"
              type="number"
              step="0.1"
              min="0"
              {...register("volume")}
              placeholder="e.g. 12.5"
              className={smallInputStyle}
            />
            {errors.volume && (
              <p className="text-red-500 text-sm mt-1">
                {errors.volume.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="additionalDetails" className={labelStyle}>
              Additional Details
            </Label>
            <textarea
              id="additionalDetails"
              {...register("additionalDetails")}
              placeholder="Optional info (access code, parking, etc.)"
              className={textareaStyle}
            />
            {errors.additionalDetails && (
              <p className="text-red-500 text-sm mt-1">
                {errors.additionalDetails.message}
              </p>
            )}
          </div>
          <div className="md:col-span-2">
            <Button
              type="submit"
              className="w-full bg-white/10 hover:bg-white/20 text-white text-lg font-semibold py-6 transition-colors duration-200 border border-white/30"
            >
              Connect space to the network
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default HostApplicationForm;
