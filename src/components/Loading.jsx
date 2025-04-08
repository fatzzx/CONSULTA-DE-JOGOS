export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-sky-500 border-dashed rounded-full animate-spin"></div>
        <p className="text-lg font-medium">Loading...</p>
      </div>
    </div>
  );
}
