import React from 'react';

const PostCardSkeleton = () => (
  <div className="bg-[#1a1a1a] border border-[#333] rounded-2xl animate-pulse overflow-hidden">
    <div className="w-full aspect-square bg-[#2a2a2a]"></div>
    <div className="p-4 space-y-3">
      <div className="h-4 bg-[#2a2a2a] rounded w-3/4"></div>
      <div className="h-3 bg-[#2a2a2a] rounded w-1/2"></div>
      <div className="flex gap-4 mt-4">
        <div className="h-4 w-16 bg-[#2a2a2a] rounded"></div>
        <div className="h-4 w-20 bg-[#2a2a2a] rounded"></div>
      </div>
    </div>
  </div>
);

export default PostCardSkeleton;
