"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { updateLink } from "~/src/app/(protected)/dashboard/actions";
import type { UpdateLinkSchema } from "~/src/app/(protected)/dashboard/schema";
import { Button } from "~/src/components/ui/button";
import { Input } from "~/src/components/ui/input";
import { Label } from "~/src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/src/components/ui/select";

type Props = {
  id: string;
  title: string;
  url: string;
  isPublic: boolean;
  description: string;
  categoryId: string | null;
};

export default function EditPage(props: Props) {
  const {
    handleSubmit,
    register: formRegister,
    setValue: formSetValue,
    formState,
  } = useForm();

  const formOnSubmit = handleSubmit(async (data) => {
    const response = await updateLink(data as UpdateLinkSchema);
    if (response.status === "success") {
      toast.success("Link updated successfully");

      return;
    }

    toast.error(`Something went wrong: ${response.message}`);
    return;
  });

  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold">Edit Link</h1>
      </div>
      <form onSubmit={formOnSubmit} className="mt-5">
        <input
          type="hidden"
          id="id"
          defaultValue={props.id}
          {...formRegister("id")}
        />
        <div className="mt-2 space-y-5">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              id="title"
              defaultValue={props.title}
              {...formRegister("title")}
            />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Input
              id="description"
              defaultValue={props.description}
              {...formRegister("description")}
            />

            <div className="space-y-2">
              <Label>Link</Label>
              <Input
                id="url"
                defaultValue={props.url}
                {...formRegister("url")}
              />
            </div>
          </div>
          <div className="md:flex space-y-4 md:space-y-0 md:space-x-2">
            <div className="space-y-2 w-full">
              <Label>Visibility</Label>
              <Select
                defaultValue={props.isPublic ? "public" : "private"}
                onValueChange={(value) => {
                  formSetValue("visibility", value);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="mt-7 flex space-x-2">
          <Button
            type="submit"
            className="w-1/2"
            isLoading={formState.isSubmitting}
          >
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}
