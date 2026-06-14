import SubscriptionForm from "../features/subscription-form/components/subscription-form";

export default function Homepage() {
  return (
    <main className="w-full h-dvh flex lg:justify-center lg:items-center lg:bg-blue-100">
      <section className="lg:p-4 bg-white lg:rounded-2xl lg:shadow-2xl shadow-slate-500/20 w-full lg:max-w-5xl h-full lg:max-h-160 flex flex-1 flex-col p-0 shadow-none">
        <SubscriptionForm />
      </section>
    </main>
  );
}
