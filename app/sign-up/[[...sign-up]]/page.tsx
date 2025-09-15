import { SignUp } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";

export default function Page() {
  return (
    <div className="flex items-center justify-center py-5">
      <SignUp signInUrl="/sign-in" appearance={{ theme: neobrutalism }} />
    </div>
  );
}
