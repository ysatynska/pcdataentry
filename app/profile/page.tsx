import { authUser, User } from '@/auth';
import { EmailResetForm, NameResetForm } from '@/components/reset_forms';

export default async function Profile() {
  const user = await authUser() as User;
  return (
    <div className="w-full">
      <section>
        <h1 className="text-2xl mb-6 text-primary font-bold">1. Name Reset</h1>
        <div className="relative mx-auto flex w-full max-w-[400px] flex-col shadow-2xl rounded-lg outline outline-primary p-8 items-center bg-white">
          <NameResetForm user_id={user.id} name={user.name}/>
        </div>
      </section>
      <section>
        <h1 className="text-2xl mb-6 text-primary font-bold">2. Email Reset</h1>
        <div className="relative mx-auto flex w-full max-w-[400px] flex-col shadow-2xl rounded-lg outline outline-primary p-8 items-center bg-white">
          <EmailResetForm user_id={user.id} email={user.email}/>
        </div>
      </section>
    </div>
  );
}
