import { addLink } from "~/src/app/(protected)/dashboard/actions";
import { Button } from "~/src/components/ui/button";
import {
  Dialog,
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
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-32">Add</Button>
      </DialogTrigger>

      <DialogContent className="w-[90%] md:w-full">
        <DialogHeader>
          <DialogTitle>Add new link</DialogTitle>
          <DialogDescription>
            <form action={addLink}>
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
                <Button className="w-1/2" variant="outline">
                  Cancel
                </Button>
                <Button type="submit" className="w-1/2">
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
