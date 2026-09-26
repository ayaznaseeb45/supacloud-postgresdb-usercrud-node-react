function AboutPage() {
  return (
    <div className="directory-page">
      <section
        className="mx-auto max-w-6xl rounded-2xl border border-gray-200 bg-white p-6 sm:p-10"
        aria-labelledby="about-title"
      >
        <p className="eyebrow">ABOUT SUPACLOUD</p>
        <h1 id="about-title" className="directory-heading text-3xl font-bold sm:text-4xl">
          Node.js + React CRUD Project.
        </h1>
        <p className="mt-5 max-w-2xl leading-8 text-gray-600">
          SupaCloud is a dummy project built for practice.
          It brings a frontend and backend together so you can create, view,
          update, and delete users.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
            <h2 className="text-lg font-semibold text-teal-800">Frontend</h2>
            <p className="mt-3 leading-7 text-gray-600">
              Built with React, Vite, and Tailwind CSS. It includes a user form,
              a table to view users, and simple Home and About navigation.
              Axios sends requests to the backend.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
            <h2 className="text-lg font-semibold text-teal-800">Backend</h2>
            <p className="mt-3 leading-7 text-gray-600">
              Built with Node.js and Express. The API handles requests to add,
              fetch, update, and delete users. Zod validates user details,
              and Prisma handles database queries.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
            <h2 className="text-lg font-semibold text-teal-800">Database</h2>
            <p className="mt-3 leading-7 text-gray-600">
              PostgreSQL stores user details, including name, email, age,
              and city. Prisma connects the backend to the database so
              changes can be saved and retrieved.
            </p>
          </div>
        </div>

        <p className="mt-7 max-w-2xl text-sm leading-7 text-gray-500">
          Made for learning and experimentation with a simple user management app.
        </p>
        <a href="#/" className="mt-6 inline-block rounded-lg bg-teal-700 px-5 py-3 font-semibold text-white hover:bg-teal-800">
          Back to Home
        </a>
      </section>
    </div>
  );
}

export default AboutPage;

