// Tag color combinations
export const tagColors = [
  'from-orange-100 to-yellow-100 text-orange-700 border-orange-200 hover:from-orange-200 hover:to-yellow-200 hover:border-orange-300 hover:shadow-orange-200/50',
  'from-rose-100 to-pink-100 text-rose-700 border-rose-200 hover:from-rose-200 hover:to-pink-200 hover:border-rose-300 hover:shadow-rose-200/50',
  'from-blue-100 to-cyan-100 text-blue-700 border-blue-200 hover:from-blue-200 hover:to-cyan-200 hover:border-blue-300 hover:shadow-blue-200/50',
  'from-green-100 to-emerald-100 text-green-700 border-green-200 hover:from-green-200 hover:to-emerald-200 hover:border-green-300 hover:shadow-green-200/50',
  'from-purple-100 to-fuchsia-100 text-purple-700 border-purple-200 hover:from-purple-200 hover:to-fuchsia-200 hover:border-purple-300 hover:shadow-purple-200/50'
];

// Function to get consistent tag styling
export const getTagStyle = (index: number) => {
  return `inline-flex items-center gap-1.5 pl-2 pr-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r ${tagColors[index % tagColors.length]} border shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer`;
};
