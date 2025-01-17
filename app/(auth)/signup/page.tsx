import CreateAccountForm from "@/components/ui/create-account-form";

export default function CreateAccountPage() {
  return (
    <main className="flex items-center justify-center h-[calc(100vh-10rem)]">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4">
        <CreateAccountForm />
      </div>
    </main>
  );
}
