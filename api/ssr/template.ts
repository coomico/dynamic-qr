import { createSSRApp } from "vue";

export function createApp(redirect?: string, owner?: string) {
  return createSSRApp({
    data: () => ({link: redirect, username: owner}),
    template: `<main class="flex flex-col h-dvh">
    <div class="m-auto px-2 max-w-xl space-y-4">
      <div>
        <h3 class="text-2xl font-semibold tracking-tight">Redirecting to a secret link... &#129323;</h3>
        <p class="text-gray-500">Before that, please provide the password first.</p>
      </div>

      <form :action="link" method="POST" class="flex flex-col gap-4">
        <div class="space-y-2">
          <label
            for="password"
            class="text-sm font-medium leading-none">
              Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="minimum 8 characters"
            class="flex h-9 w-full rounded-xl border border-gray-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-50"/>
        </div>

        <button
          type="submit"
          class="inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-300 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white shadow hover:bg-blue-600/90 h-9 px-4 py-2">
            Redirect
        </button>
      </form>

      <div class="flex flex-col text-center">
        <small class="text-gray-500">Secret link by @{{ username }}.</small>
      </div>

    </div>
  </main>`,
  })
}