function Spinner() {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-70 flex justify-center items-center z-50">
      <div className="w-14 h-14 border-8 border-gray-200 border-t-orange-600 rounded-full animate-spin"></div>
    </div>
  );
}

export default Spinner;