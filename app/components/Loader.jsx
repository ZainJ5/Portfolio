import { Html, useProgress } from "@react-three/drei";

const CanvasLoader = () => {
  const { progress } = useProgress();
  
  return (
    <Html
      as='div'
      center
      className="flex flex-col items-center justify-center"
    >
      <div className="w-20 h-20 border-4 border-t-blue-500 border-b-purple-500 border-l-transparent border-r-transparent rounded-full animate-spin" />
      <p className="text-sm font-bold mt-4 text-white">
        {progress.toFixed(2)}%
      </p>
    </Html>
  );
};

export default CanvasLoader;