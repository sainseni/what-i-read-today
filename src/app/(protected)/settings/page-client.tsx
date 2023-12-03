"use client";

import { Input } from "~/src/components/ui/input";
import { Label } from "~/src/components/ui/label";

type Props = {
  userId: string;
  isDev: boolean;
};

export default function SettingsPage(props: Props) {
  const apiUrl = props.isDev
    ? "http://localhost:3000"
    : "https://read.sainseni.org";

  return (
    <form>
      <div className="mt-5 space-y-5">
        <div>
          <Label>API Public</Label>
          <Input
            defaultValue={`${apiUrl}/api/user/${props.userId}`}
            disabled
            readOnly
          />
        </div>
        <div>
          <Label>API Private (Include Private Links)</Label>
          <Input
            defaultValue={`${apiUrl}/api/user/${props.userId}`}
            disabled
            readOnly
          />
        </div>
      </div>
    </form>
  );
}
