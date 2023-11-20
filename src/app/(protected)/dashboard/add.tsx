"use client";

import { useState } from "react";
import { toast } from "sonner";

import { addLink } from "~/src/app/(protected)/dashboard/actions";
import { Button } from "~/src/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/src/components/ui/dialog";
import { Input } from "~/src/components/ui/input";
import { Label } from "~/src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/src/components/ui/select";

export function Add() {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-32">Add</Button>
      </DialogTrigger>

      <DialogContent className="w-[90%] md:w-full">
        <DialogHeader>
          <DialogTitle>Add new link</DialogTitle>
          <DialogDescription>
            <form
              action={async (e) => {
                const response = await addLink(e);
                if (response.status === "success") {
                  toast.success("Link added successfully");
                  setIsOpen(false);
                  return;
                }

                toast.error(`Something went wrong: ${response.message}`);
                return;
              }}
            >
              <div className="mt-2 space-y-5">
                <div className="space-y-2">
                  <Label>Link</Label>
                  <Input name="url" placeholder="https://example.com" />
                </div>
                <div className="md:flex space-y-4 md:space-y-0 md:space-x-2">
                  <div className="space-y-2 md:w-1/2">
                    <Label>Category (Optional)</Label>
                    <Select name="category">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Visibility" />
                      </SelectTrigger>
                      <SelectContent defaultValue="public">
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 md:w-1/2">
                    <Label>Visibility</Label>
                    <Select defaultValue="public" name="visibility">
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
                <DialogClose asChild>
                  <Button className="w-1/2" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>

                <Button type="submit" className="w-1/2" isLoadingButton>
                  Add
                </Button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
