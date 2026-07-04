function AuthLayout({ title, children }) {
  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gray-50
      px-4
    "
    >
      <div
        className="
        bg-white
        shadow-lg
        rounded-2xl
        p-8
        w-full
        max-w-md
      "
      >
        <h1
          className="
          text-3xl
          font-bold
          text-center
          text-orange-500
          mb-6
        "
        >
          {title}
        </h1>

        {children}
      </div>
    </div>
  );
}

export default AuthLayout;