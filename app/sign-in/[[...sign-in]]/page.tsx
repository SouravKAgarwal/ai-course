import { SignIn } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";

export default function Page() {
  return (
    <div className="flex items-center justify-center py-5">
      <SignIn signUpUrl="/sign-up" appearance={{ theme: neobrutalism }} />
    </div>
  );
}
