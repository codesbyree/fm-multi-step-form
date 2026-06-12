import SubscriptionForm from "../features/subscription-form/components/subscription-form";

export default function Homepage() {
  return (
    <main className="w-full h-dvh grid place-items-center">
      <section className="p-4 bg-white rounded-2xl shadow-2xl shadow-slate-500/20 w-full max-w-5xl h-full max-h-160 flex flex-col">
        <SubscriptionForm />
      </section>
    </main>
  );
}
