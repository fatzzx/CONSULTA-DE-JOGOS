export default function Loading() {
  return (
    <div className="min-h-screen bg-[#1b1b1b] flex flex-col items-center justify-center">
      <div className="w-12 h-12 border-4 border-sky-500 border-dashed rounded-full animate-spin"></div>
      <p className="mt-4 text-white text-lg font-medium">Loading...</p>
    </div>
  );
}
