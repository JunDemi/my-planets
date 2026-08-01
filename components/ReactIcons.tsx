import { BiLogoTypescript } from 'react-icons/bi';
import { FaAws, FaDocker, FaReact } from 'react-icons/fa';
import { MdBarChart } from 'react-icons/md';
import { RiCursorAiFill, RiNextjsFill, RiRobot2Line, RiTailwindCssFill } from 'react-icons/ri';
import { SiFirebase, SiFramer, SiRedux, SiSocketdotio, SiTanstack, SiZod } from 'react-icons/si';

interface ReactIconsProps {
  type: string;
  size?: number;
  color?: string;
}

const ReactIcons = ({ type, size = 24, color = '#FFF' }: ReactIconsProps) => {
  const iconMap = {
    React: <FaReact size={size} color={color} />,
    'React Native': <FaReact size={size} color={color} />,
    'Next.js': <RiNextjsFill size={size} color={color} />,
    TypeScript: <BiLogoTypescript size={size} color={color} />,
    'Tailwind CSS': <RiTailwindCssFill size={size} color={color} />,
    'Data Fetch': <SiTanstack size={size} color={color} />,
    WebSocket: <SiSocketdotio size={size} color={color} />,
    Form: <SiZod size={size} color={color} />,
    'Data View': <MdBarChart size={size} color={color} />,
    'Framer Motion': <SiFramer size={size} color={color} />,
    State: <SiRedux size={size} color={color} />,
    AWS: <FaAws size={size} color={color} />,
    Docker: <FaDocker size={size} color={color} />,
    Firebase: <SiFirebase size={size} color={color} />,
    'AI Dev': <RiCursorAiFill size={size} color={color} />,
    'AI Workflow': <RiRobot2Line size={size} color={color} />,
  }[type];

  return iconMap;
};

export default ReactIcons;
