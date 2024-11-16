"use client";

import PageWrapper from "@/components/PageWrapper";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthUserContext";
import { CarType } from "@/enums";
import { useToast } from "@/hooks/use-toast";
import { fileToBase64 } from "@/lib/utils";
import { X, Plus, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

type Props = {};

const CreateCar = (props: Props) => {
  const { authUser } = useAuth();

  const [imagesToUpload, setImagesToUpload] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [carType, setCarType] = useState<CarType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const { toast } = useToast();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const base64Images: string[] = [];

      await Promise.all(
        Array.from(files).map(async (file) => {
          const base64 = (await fileToBase64(file)) as string;
          base64Images.push(base64);
        })
      );

      setImagesToUpload((prev) => [...prev, ...base64Images]);
    }
  };

  const removeImage = (index: number) => {
    setImagesToUpload((prev) => prev.filter((_, i) => i !== index));
  };

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags((prev) => [...prev, newTag]);
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);

    const formValues = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      dealer: authUser?.uid,
      company: formData.get("company") as string,
      isActive: (formData.get("isActive") as string) === "on" ? true : false,
      car_type: carType,
      images: imagesToUpload,
      tags,
    };

    try {
      const res = await fetch("/api/car", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      if (res.ok) {
        router.push("/mycars");
        setLoading(false);
      } else {
        toast({
          title: "Car cannot be created!",
          description: "An error has occurred",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProtectedRoute>
      <PageWrapper className="my-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Car Details</CardTitle>
            <CardDescription>
              Enter the details of the car you want to list.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4" id="car-form">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  name="title"
                  id="title"
                  placeholder="Enter car title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  name="description"
                  id="description"
                  placeholder="Enter car description"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    name="company"
                    id="company"
                    placeholder="Enter car company"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="carType">Car Type</Label>
                  <Select
                    required
                    onValueChange={(value) => setCarType(value as CarType)}
                  >
                    <SelectTrigger id="carType" name="carType">
                      <SelectValue placeholder="Select car type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedan">Sedan</SelectItem>
                      <SelectItem value="suv">SUV</SelectItem>
                      <SelectItem value="hatchback">Hatchback</SelectItem>
                      <SelectItem value="coupe">Coupe</SelectItem>
                      <SelectItem value="truck">Truck</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="isActive" name="isActive" />
                <Label htmlFor="isActive">Active Listing</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="images">Images</Label>
                <Input
                  name="images"
                  id="images"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="h-16 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {imagesToUpload.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Uploaded ${index + 1}`}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                        aria-label="Remove image"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <div className="flex space-x-2">
                  <Input
                    name="tags"
                    id="tags"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        addTag();
                      }
                    }}
                  />
                  <Button type="button" onClick={addTag} size="icon">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-sm flex items-center"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 text-secondary-foreground/80 hover:text-secondary-foreground"
                        aria-label={`Remove ${tag} tag`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </form>
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full" form="car-form">
              {loading ? (
                <Loader2 className="w-5 h-auto animate-spin" />
              ) : (
                "Submit"
              )}
            </Button>
          </CardFooter>
        </Card>
      </PageWrapper>
    </ProtectedRoute>
  );
};

export default CreateCar;
