"use client";

import React, { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Edit, Trash2, X, Plus, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { fileToBase64 } from "@/lib/utils";
import { CarType } from "@/enums";
import ProtectedRoute from "./ProtectedRoute";
import PageWrapper from "./PageWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
  car: CarWithId;
  carId: string;
};

const CarInfoComponent = ({ car, carId }: Props) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<CarWithId>(car);

  const [newTag, setNewTag] = useState<string>("");
  const [tags, setTags] = useState<string[]>(car.tags || []);

  const [images, setImages] = useState<File[]>([]);
  const [imagesToUpload, setImagesToUpload] = useState<string[]>(
    car.images || []
  );

  const [loading, setLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: CarType) => {
    setFormData((prev) => ({ ...prev, car_type: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isActive: checked }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const base64Images: string[] = [];
      const newFiles: File[] = [];

      await Promise.all(
        Array.from(files).map(async (file) => {
          const base64 = (await fileToBase64(file)) as string;
          base64Images.push(base64);
          newFiles.push(file);
        })
      );

      setImages((prev) => [...prev, ...newFiles]);
      setImagesToUpload((prev) => [...prev, ...base64Images]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
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

  const handleUpdate = () => {
    setIsEditing(true);
    toast({
      title: "Edit Mode Activated",
      description: "You can now edit the car details.",
    });
  };

  const handleDelete = () => {
    toast({
      title: "Delete Initiated",
      description: "You've chosen to delete this car listing.",
      variant: "destructive",
    });
    // Implement delete logic here
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const updatedCar = {
      ...formData,
      images: imagesToUpload,
      tags,
    };

    console.log("Updated Car:", updatedCar);

    try {
      const res = await fetch(`/api/car/modify/${carId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCar),
      });

      if (res.ok) {
        setIsEditing(false);
        toast({
          title: "Changes Saved",
          description: "Your changes have been successfully saved.",
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
            <div className="flex justify-between items-center">
              <CardTitle className="text-3xl font-bold">Car Details</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleUpdate}>
                    <Edit className="mr-2 h-4 w-4" />
                    <span>Update</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDelete}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    disabled={!isEditing}
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    disabled={!isEditing}
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      disabled={!isEditing}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="carType">Car Type</Label>
                    <Select
                      disabled={!isEditing}
                      value={formData.car_type as CarType}
                      onValueChange={handleSelectChange}
                    >
                      <SelectTrigger id="carType">
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
                  <Switch
                    id="isActive"
                    name="isActive"
                    disabled={!isEditing}
                    checked={formData.isActive}
                    onCheckedChange={handleSwitchChange}
                  />
                  <Label htmlFor="isActive">Active Listing</Label>
                </div>

                <div>
                  <Label htmlFor="images">Images</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {imagesToUpload.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image}
                          alt={`Car ${index + 1}`}
                          className="w-20 h-20 object-cover rounded"
                        />
                        {isEditing && (
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                            aria-label="Remove image"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  {isEditing && (
                    <Input
                      id="images"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="mt-2"
                    />
                  )}
                </div>

                <div>
                  <Label htmlFor="tags">Tags</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-sm flex items-center"
                      >
                        {tag}
                        {isEditing && (
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-1 text-secondary-foreground/80 hover:text-secondary-foreground"
                            aria-label={`Remove ${tag} tag`}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </span>
                    ))}
                  </div>
                  {isEditing && (
                    <div className="flex space-x-2 mt-2">
                      <Input
                        id="newTag"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Add a tag"
                      />
                      <Button type="button" onClick={addTag} size="icon">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {isEditing && (
                <Button type="submit" className="w-full">
                  {!loading ? (
                    "Save Changes"
                  ) : (
                    <Loader2 className="w-5 h-auto animate-spin" />
                  )}
                </Button>
              )}
            </form>
          </CardContent>
        </Card>
      </PageWrapper>
    </ProtectedRoute>
  );
};

export default CarInfoComponent;
