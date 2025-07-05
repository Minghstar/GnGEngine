import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 flex justify-center items-center p-4">
      <div className="w-full max-w-md">
        <SignUp 
          appearance={{
            variables: {
              colorPrimary: "#007F3E", // GNG green
              colorText: "#000000",
              colorTextOnPrimaryBackground: "#ffffff",
              borderRadius: "12px",
              colorAccent: "#FFD700", // Gold for tags or highlights
              fontFamily: "Inter, sans-serif"
            },
            elements: {
              card: "shadow-2xl border border-gray-200 bg-white",
              headerTitle: "text-xl font-semibold text-primary",
              formFieldInput: "rounded-md focus:ring-2 ring-accent",
              socialButtonsBlockButton: "hover:scale-[1.02] transition-all",
              footerAction: "text-sm text-gray-500",
              formButtonPrimary: "bg-primary text-white hover:bg-primary/90 rounded-md"
            }
          }}
        />
      </div>
    </div>
  );
} 