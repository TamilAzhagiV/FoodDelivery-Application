import CustomerNavbar from "./CustomerNavbar";

function CustomerLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100">
      <CustomerNavbar />

      <main className="mx-auto max-w-7xl px-6 py-6">
        {children}
      </main>
    </div>
  );
}

export default CustomerLayout;