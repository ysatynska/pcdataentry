export default function SignInForm() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center p-20 bg-white rounded-xl shadow-xl outline outline-primary">
        <h1 className="text-2xl font-semibold text-primary mb-4">
          Welcome to Student Evaluations Platform
        </h1>
        <p className="text-md text-gray-600 mb-3">Please sign in to access the website.</p>
        <a
          href="/api/auth/signin"
          className="inline-block py-2 px-4 bg-primary text-white rounded-lg text-lg font-semibold hover:bg-primary-dark transition-colors"
        >
          Sign In
        </a>
      </div>
    </div>
  );
}